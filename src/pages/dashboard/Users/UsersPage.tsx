import { Formik, FieldArray } from "formik";
import { Key } from "react";
import * as yup from "yup";
import { InitialUser, NewUser } from "../../../models/newUser";
import { FormInput } from "../../../shared/components/form-input";
import { FormRadio } from "../../../shared/components/form-radio";

const initialValues = new InitialUser();
// chyba zamiast UsersPage to nazwać CreateUser
const UsersPage = () => {
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .required("Name is required")
      .min(3, "Name should have more than 3 letters"),
    lastName: yup
      .string()
      .required("LastName is required")
      .min(3, "LastName should have more than 3 letters"),
    birthDate: yup.date(),
    childrenAmount: yup.number().positive(),
    addresses: yup.array(),
    role: yup.string().required("Role is required"),
  });
  const onSubmit = (values: NewUser): void => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(props: any) => {
        const {
          values,
          handleChange,
          errors,
          touched,
          handleBlur,
          handleSubmit,
          isValid,
          dirty,
        } = props;
        return (
          <div className='create-container'>
            <h1>Create user</h1>
            <form onSubmit={handleSubmit}>
              <FormInput
                label={"Name"}
                value={values}
                name={"name"}
                type={"text"}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched}
                error={errors}
              ></FormInput>
              <FormInput
                label={"Lastname"}
                value={values}
                name={"lastName"}
                type={"text"}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched}
                error={errors}
              ></FormInput>
              <FormInput
                label={"Birthdate"}
                value={values}
                name={"birthDate"}
                type={"date"}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched}
                error={errors}
              ></FormInput>
              <FormInput
                label={"Children Amount"}
                value={values}
                name={"childrenAmount"}
                type={"number"}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched}
                error={errors}
              ></FormInput>

              <FieldArray name='addresses'>
                {({ insert, remove, push }) => (
                  <div>
                    {values.addresses.length > 0 &&
                      values.addresses.map(
                        (
                          address: NewUser["addresses"],
                          index: Key | null | undefined
                        ) => (
                          <div className='row' key={index}>
                            <div className='col'>
                              <label htmlFor={`addresses.${index}.city`}>
                                City
                              </label>
                              <FormInput
                                label={"City"}
                                value={values}
                                name={`addresses.${index}.city`}
                                type={"text"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                touched={touched}
                                error={errors}
                              ></FormInput>
                            </div>
                            <div className='col'>
                              <label htmlFor={`addresses.${index}.country`}>
                                Country
                              </label>
                              <FormInput
                                label={"Country"}
                                value={values}
                                name={`addresses.${index}.country`}
                                type={"text"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                touched={touched}
                                error={errors}
                              ></FormInput>
                            </div>
                            <div className='col'>
                              <button
                                type='button'
                                className='secondary'
                                onClick={() => remove(index as number)}
                              >
                                X
                              </button>
                            </div>
                          </div>
                        )
                      )}
                    <button
                      type='button'
                      className='secondary'
                      onClick={() => push({ city: "", country: "" })}
                    >
                      Add Address
                    </button>
                  </div>
                )}
              </FieldArray>
              <legend>Select a role:</legend>
              <FormRadio
                label={"Admin"}
                value={"admin"}
                name={"role"}
                // type={"radio"}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched}
                error={errors}
              ></FormRadio>
              <FormRadio
                label={"User"}
                value={"user"}
                name={"role"}
                // type={"radio"}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched}
                error={errors}
              ></FormRadio>
              <button disabled={!(touched && isValid)} type='submit'>
                Create
              </button>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};
export default UsersPage;
