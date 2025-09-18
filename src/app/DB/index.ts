import config from '../config';
import { USER_ROLE } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';

const superUser = {
  firstName: 'Muddasir',
  lastName: 'Faiyaj',
  email: 'muddasirfaiyaj66@gmail.com',
  password: config.super_admin_password,
  phone: '+8801780367604',
  role: USER_ROLE.superAdmin,
  designation: 'CEO & Founder',
  department: 'Janatar Obhijog Ltd.',
  isDeleted: false,
  postCode: '1212',
  thana: 'Vatara',
  district: 'Dhaka',
  division: 'Dhaka',
  address: 'House # 123, Road # 12, Vatara, Dhaka',
  profileImg:
    'https://res.cloudinary.com/dcqr7rkm6/image/upload/v1751224670/routinecraft/profiles/ivhh0a7zs7uj5fusqrxe.jpg',
};

const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({
      role: USER_ROLE.superAdmin,
    });
    if (!isSuperAdminExist) {
      await User.create(superUser);
      console.log('Superadmin created');
    } else {
      console.log('Superadmin already exists');
    }
  } catch (err) {
    console.error('Error in seedSuperAdmin:', err);
    throw err;
  }
};

export default seedSuperAdmin;
