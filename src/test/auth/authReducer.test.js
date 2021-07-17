import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";


describe('Pruebas en authReducer', () => {

    test('debe de retornar el estado por defecto ', () => {

        const state = authReducer({ logged: false }, {});
        expect(state).toEqual({ logged: false });

    });

    test('debe de autenticar y colocar el name del usuario ', () => {

        const action = {
            type: types.login,
            payload: {
                name: 'hernan'
            }
        }

        const state = authReducer({ logged: false }, action);
        expect(state).toEqual({
            logged: true,
            name: 'hernan'
        });
        
    });

    test('debe de borrar el name del usario y logged en false ', () => {

        const action = {
            type: types.logout
        }

        const state = authReducer({ logged: true, name: 'Pedro' }, action);
        expect(state).toEqual({ logged: false });

    });

})
