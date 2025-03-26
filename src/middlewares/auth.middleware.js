export const authorization = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        error: 'Forbidden',
        requiredRoles: roles,
        yourRole: req.user.role
      });
    }
    next();
  };
};

export const isCartOwner = async (req, res, next) => {
  if (req.user.role === 'admin') return next();
  if (req.user.cart.toString() !== req.params.cid) {
    return res.status(403).json({
      status: 'error',
      error: 'You can only interact with your own cart'
    });
  }
  next();

  export const canCreateProducts = (req, res, next) => {
    if (req.user.role === 'admin' || req.user.role === 'premium') {
      return next();
    }
    res.status(403).json({ error: 'Requires admin or premium role' });
  };
};