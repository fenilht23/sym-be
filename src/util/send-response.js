const sendResponse = (res, status = "failed", message = undefined, data = undefined, error = undefined) => res.json(
    {
        status,
        message,
        data,
        error
    },
);

export default sendResponse;