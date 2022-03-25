require('dotenv').config();
const bcrypt = require('bcryptjs');
const { v4: uuid } = require('uuid');

class UserModel {
  constructor(input) {
    this.id = input && input.id ? input.id : uuid();
    this.username = input.username;
    this.email = input.email || '';
    this.password = bcrypt.hashSync(input.password, 10);
    this.role = 'user';
    this.avatar_img = input.avatar_img || '';
    this.personal_info = {
      full_name: input.full_name || '',
      address: input.address || '',
      phone_number: {
        area_code: input.area_code || '',
        number: input.phone_number || '',
      },
      birthday: input.birthday || '',
    };
  }

  get() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role,
      avatar_img: this.avatar_img,
      personal_info: this.personal_info,
    };
  }
}

module.exports = UserModel;
