import { mount } from "enzyme";
import { MemoryRouter, Router } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthContext";
import { Navbar } from "../../../components/ui/Navbar";
import { types } from "../../../types/types";


describe('Pruebas en <Navbar />', () => {

    const historyMock = {
        push: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn(),
        replace: jest.fn()
    }

    const contexValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Fernando'
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={contexValue}>
            <MemoryRouter>
                <Router history={historyMock}>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    )

    test('debe de mostrarse correctamente ', () => {

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('#nameId').exists()).toBe(true);
        expect(wrapper.find('#nameId').text().trim()).toBe('Fernando');
    });

    test('debe de llamar el logout y el usar el history ', () => {

        wrapper.find('button').prop('onClick')();

        expect(contexValue.dispatch).toHaveBeenCalledWith({
            type: types.logout
        });

        expect(historyMock.replace).toHaveBeenCalledWith('/login');

    })



})
