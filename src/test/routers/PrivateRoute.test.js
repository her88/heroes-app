import { mount } from "enzyme"
import { MemoryRouter } from "react-router-dom";
import { PrivateRoute } from "../../routers/PrivateRoute";


describe('Pruebas en <PrivateRoute />', () => {

    const props = {
        location: {
            pathname: '/marvel'
        }
    }

    Storage.prototype.setItem = jest.fn();

    test('debe de mostrar el componente si esta autenticado ', () => {

        const wrapper = mount(
            // Para hacer pruebas de router oon ciertas rutas
            <MemoryRouter>              
                <PrivateRoute 
                    isAuthenticated={true} 
                    component={() => <span>Listo!</span>}
                    {...props}
                />
            </MemoryRouter>
        );

        //console.log(wrapper.html());
        // Nota: El Redirect es un string vacio

        expect(wrapper.find('span').exists()).toBe(true);
        expect(wrapper.find('span').text()).toEqual('Listo!');
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel');
        
    });

    test('debe de bloquear el componente si no esta autenticado ', () => {
        

        const wrapper = mount(
            <MemoryRouter>              
                <PrivateRoute 
                    isAuthenticated={false} 
                    component={() => <span>Listo!</span>}
                    {...props}
                />
            </MemoryRouter>
        );
       
        expect(wrapper.find('span').exists()).toBe(false);
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel');
    });
    
    
    
})
