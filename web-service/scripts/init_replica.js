config = {
        _id: "rs0",
        members: [{
            _id: 0, host: "localhost:27018"
        }]
    }

rs.initiate(config)
rs.status()