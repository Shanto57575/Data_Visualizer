import mongoose from "mongoose"

const getAllOrders = async (req, res) => {
    try {
        const orders = await mongoose.connection.db.collection('shopifyOrders').find({}).toArray()
        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }
        res.json(orders)
    } catch (error) {
        res.status(500).send('Error Fetching orders');
    }
}

const getTotalSalesOverTime = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const start = startDate ? new Date(startDate) : new Date('1970-01-01T00:00:00Z');
        const end = endDate ? new Date(endDate) : new Date();

        const totalSales = await mongoose.connection.db.collection('shopifyOrders').aggregate([
            {
                $addFields: {
                    created_at: { $toDate: "$created_at" },
                    total_price: { $toDouble: "$total_price" }
                }
            },
            {
                $match: {
                    created_at: {
                        $gte: start,
                        $lte: end
                    }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$created_at" },
                        month: { $month: "$created_at" }
                    },
                    totalSales: { $sum: "$total_price" }
                }
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1 }
            }
        ]).toArray();

        if (totalSales.length === 0) {
            return res.status(404).json({ message: 'No sales data found' });
        }

        res.json(totalSales);
    } catch (error) {
        res.status(500).send('Error fetching total sales');
    }
};

const getSalesGrowthRateOverTime = async (req, res) => {
    try {
        const { interval = 'monthly' } = req.query;

        const groupStages = {
            daily: {
                $group: {
                    _id: {
                        year: { $year: { $toDate: "$created_at" } },
                        month: { $month: { $toDate: "$created_at" } },
                        day: { $dayOfMonth: { $toDate: "$created_at" } }
                    },
                    totalSales: { $sum: { $toDouble: "$total_price" } }
                }
            },
            monthly: {
                $group: {
                    _id: {
                        year: { $year: { $toDate: "$created_at" } },
                        month: { $month: { $toDate: "$created_at" } }
                    },
                    totalSales: { $sum: { $toDouble: "$total_price" } }
                }
            },
            yearly: {
                $group: {
                    _id: { year: { $year: { $toDate: "$created_at" } } },
                    totalSales: { $sum: { $toDouble: "$total_price" } }
                }
            }
        };

        const groupStage = groupStages[interval];

        const salesData = await mongoose.connection.db.collection('shopifyOrders')
            .aggregate([
                groupStage,
                { $sort: { "_id": 1 } }
            ])
            .toArray();

        // Calculate the growth rate
        let growthRates = [];
        for (let i = 1; i < salesData.length; i++) {
            const previous = salesData[i - 1].totalSales;
            const current = salesData[i].totalSales;
            const growthRate = ((current - previous) / previous) * 100;
            growthRates.push({
                ...salesData[i],
                growthRate: growthRate.toFixed(2) + '%'
            });
        }

        res.json(growthRates);
    } catch (error) {
        res.status(500).send('Error fetching sales growth rate');
    }
};

const getCustomerLifetimeValueByCohorts = async (req, res) => {
    try {
        const customerLTV = await mongoose.connection.db.collection('shopifyOrders')
            .aggregate([
                {
                    $addFields: {
                        created_at: { $toDate: "$created_at" },
                        total_price: { $toDouble: "$total_price" }
                    }
                },
                {
                    $group: {
                        _id: {
                            customerId: "$customer.id",
                            year: { $year: "$created_at" },
                            month: { $month: "$created_at" }
                        },
                        totalSpent: { $sum: "$total_price" }
                    }
                },
                {
                    $group: {
                        _id: { year: "$_id.year", month: "$_id.month" },
                        cohortValue: { $avg: "$totalSpent" }
                    }
                },
                {
                    $sort: { "_id.year": 1, "_id.month": 1 }
                }
            ])
            .toArray();

        res.json(customerLTV);
    } catch (error) {
        res.status(500).send('Error fetching customer lifetime value by cohorts');
    }
};

export {
    getTotalSalesOverTime,
    getSalesGrowthRateOverTime,
    getCustomerLifetimeValueByCohorts,
    getAllOrders
}