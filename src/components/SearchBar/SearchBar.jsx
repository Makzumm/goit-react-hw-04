import { Formik, Form, Field } from "formik";

function SearchBar({ onSubmit }) {
    return (
        <header>
            <Formik initialValues={{ searchInput: '' }} onSubmit={onSubmit}>
                <Form>
                    <Field type="text" name="searchInput" autoComplete="off" autoFocus placeholder="Search images and photos" />
                    <button type="submit">Search</button>
                </Form>
            </Formik>
        </header>
    )
}

export default SearchBar;