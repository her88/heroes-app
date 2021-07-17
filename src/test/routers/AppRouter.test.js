const { mount } = require("enzyme")
const { AuthContext } = require("../../auth/AuthContext")
const { AppRouter } = require("../../routers/AppRouter")


describe('Pruebas en <AppRouter />', () => {

    const contexValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

    test('debe de mostrar el login si no esta autenticado ', () => {

        const wrapper = mount(
            <AuthContext.Provider value={contexValue}>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('debe de mostrar el componente marvel si esta autenticado', async () => {

        const contexValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: 'Pedro'
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={contexValue}>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect(wrapper.find('.navbar').exists() ).toBe(true);
        
    });
    
    
    
})
