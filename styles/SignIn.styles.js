import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logoContainer: {
        position: 'absolute',
        top: 210,
        alignItems: 'center',
        width: '100%',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        width: '100%',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    button: {
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    linkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    linkText: {
        fontSize: 14,
    },
    registerContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    registerText: {
        fontSize: 14,
    },
    registerLink: {
        fontWeight: 'bold',
    },
    checkbox: {
        marginRight: 10,
    },
    errorText: {
        marginBottom: 15,
        textAlign: 'left',
        width: '100%',
        marginTop: -10,
    },
}); 