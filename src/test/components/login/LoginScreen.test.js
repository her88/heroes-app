import { mount } from "enzyme";
import { AuthContext } from "../../../auth/AuthContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";


describe('Pruebas sobre <LoginScreen />', () => {

    const contexValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

    const history = {
        replace: jest.fn()
    }

    const wrapper = mount(
        <AuthContext.Provider value={contexValue}>
            <LoginScreen history={history} />
        </AuthContext.Provider>
    )

    test('debe de mostrarse correctamente ', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de realizar el dispatch y la navegación ', () => {

        const handleClick = wrapper.find('button').prop('onClick');

        handleClick();

        expect(contexValue.dispatch).toHaveBeenCalledTimes(1);
        expect(contexValue.dispatch).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: 'Hernan'
            }
        });

        expect(history.replace).toHaveBeenCalledWith('/');

        localStorage.setItem('lastPath', '/dc');

        handleClick();
        expect(history.replace).toHaveBeenCalledWith('/dc');

        
    });   
    
    
});
