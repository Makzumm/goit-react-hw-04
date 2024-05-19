import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';

function SearchBar({ onSubmit }) {
    const validationSchema = Yup.object({
        searchInput: Yup.string().trim().required('Input field cannot be empty'),
    });

    return (
        <header>
            <Formik
                initialValues={{ searchInput: '' }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field
                            type="text"
                            name="searchInput"
                            autoComplete="off"
                            autoFocus
                            placeholder="Search images and photos"
                        />
                        <button type="submit">Search</button>
                        {errors.searchInput && touched.searchInput ? (
                            <div style={{ color: 'red' }}>{errors.searchInput}</div>
                        ) : null}
                    </Form>
                )}
            </Formik>
        </header>
    )
}

export default SearchBar;