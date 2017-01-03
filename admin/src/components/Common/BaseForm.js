import MobxReactForm from 'mobx-react-form'
import validatorjs from 'validatorjs';

export default (fields, options = {}) => {
  const plugins = { dvr: validatorjs };

  class BaseForm extends MobxReactForm {
    onInit() { }

    onSuccess(form) { }

    onError(form) {
      // get all form errors
      console.log('All form errors', form.errors());
      // invalidate the form with a custom error message
      form.invalidate('This is a generic error message!');
    }
  }

  return new BaseForm({ fields, plugins, options })
}
