
function booksController(lib) {

    function post(req, res) {

        lib.indexDocument(req.body, function (err, response, status) {
            if (err) {
                return res.send(err);
            }
            res.status(201);
            res.json(response);

        });
    }

    function get(req, res) {
        lib.search(req.query.q, async (err, response, status) => {
            if (err) {
                return res.send(err);
            }

            const dashboardData = await lib.getDashboardData(req.query.q);

            const result = {
                properties: response.hits.hits.map(i => i._source),
                ...dashboardData
            }

            return res.json(result);

        });

    }

    function getById(req, res) {
        lib.get(req.params.id, function (err, response, status) {
            if (err) {
                res.send(err);
            } else {
                res.json(response._source);
            }
        });

    }

    async function getReport(req, res) {

        try {
            const result = await lib.getReport(req.params.reportName, req.query.q);

            console.log(JSON.stringify(result, null, 2));
            res.json(result);

        } catch (err) {
            console.error(err);
            res.send(err);
        }
    }

    return { post, get, getById, getReport }
}


module.exports = booksController;