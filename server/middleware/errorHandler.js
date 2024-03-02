const errorHandler = (err, req, res, next) => {
    console.log('SOMETHING WENT WRONG', err);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: err.message
    });
}

export default errorHandler;