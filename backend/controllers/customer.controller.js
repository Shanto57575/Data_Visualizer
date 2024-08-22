import mongoose from 'mongoose';

const getAllCustomers = async (req, res) => {
    try {
        const customers = await mongoose.connection.db.collection('shopifyCustomers').find({}).toArray();
        if (customers.length === 0) {
            return res.status(404).json({ message: 'No customers found' });
        }
        res.json(customers);
    } catch (error) {
        res.status(500).send('Error fetching customers');
    }
};

const getNewCustomersOverTime = async (req, res) => {
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
                    newCustomers: { $sum: 1 }
                }
            },
            monthly: {
                $group: {
                    _id: {
                        year: { $year: { $toDate: "$created_at" } },
                        month: { $month: { $toDate: "$created_at" } }
                    },
                    newCustomers: { $sum: 1 }
                }
            },
            yearly: {
                $group: {
                    _id: { year: { $year: { $toDate: "$created_at" } } },
                    newCustomers: { $sum: 1 }
                }
            }
        };

        const groupStage = groupStages[interval];

        const newCustomersData = await mongoose.connection.db.collection('shopifyCustomers')
            .aggregate([
                groupStage,
                { $sort: { "_id": 1 } }
            ])
            .toArray();

        res.json(newCustomersData);
    } catch (error) {
        res.status(500).send('Error fetching new customers over time');
    }
};

const getRepeatCustomers = async (req, res) => {
    try {
        const { timeframe = 'monthly' } = req.query;

        const timeframeToDatePart = {
            daily: { $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$created_at" } } },
            monthly: { $dateToString: { format: "%Y-%m", date: { $toDate: "$created_at" } } },
            quarterly: {
                $concat: [
                    { $toString: { $year: { $toDate: "$created_at" } } },
                    "-Q",
                    { $toString: { $ceil: { $divide: [{ $month: { $toDate: "$created_at" } }, 3] } } }
                ]
            },
            yearly: { $dateToString: { format: "%Y", date: { $toDate: "$created_at" } } }
        };

        const repeatCustomersData = await mongoose.connection.db.collection('shopifyOrders')
            .aggregate([
                {
                    $group: {
                        _id: {
                            customerId: "$customer.id",
                            timePeriod: timeframeToDatePart[timeframe]
                        },
                        orderCount: { $sum: 1 }
                    }
                },
                {
                    $match: {
                        orderCount: { $gt: 1 }
                    }
                },
                {
                    $group: {
                        _id: "$_id.timePeriod",
                        repeatCustomers: { $sum: 1 }
                    }
                },
                {
                    $sort: { "_id": 1 }
                }
            ])
            .toArray();

        res.json(repeatCustomersData);
    } catch (error) {
        res.status(500).send('Error fetching repeat customers');
    }
};

const getCustomerGeographicalDistribution = async (req, res) => {
    try {
        const geographicalDistribution = await mongoose.connection.db.collection('shopifyCustomers')
            .aggregate([
                {
                    $group: {
                        _id: "$default_address.city",
                        count: { $sum: 1 }
                    }
                },
                {
                    $match: {
                        _id: { $ne: null }
                    }
                },
                {
                    $sort: { count: -1 }
                }
            ])
            .toArray();

        res.json(geographicalDistribution);
    } catch (error) {
        res.status(500).send('Error fetching customer geographical distribution');
    }
};

export {
    getAllCustomers,
    getRepeatCustomers,
    getNewCustomersOverTime,
    getCustomerGeographicalDistribution
};
