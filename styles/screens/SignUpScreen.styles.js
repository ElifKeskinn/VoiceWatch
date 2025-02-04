import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
    },
    headerContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 30,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 15,
    },
    rowInput: {
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        width: '48%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    contactInputContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
    },
    button: {
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    backButton: {
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    agreementContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    checkbox: {
        marginRight: 10,
    },
    agreementText: {
        fontSize: 14,
    },
    errorText: {
        marginBottom: 10,
        textAlign: 'left',
        marginTop: -10,
    },
    stepIndicator: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        width: '100%',
        marginBottom: 20,
    },
    stepCircle: {
        width: 10,
        height: 10,
        borderRadius: 10,
        opacity: 0.4,
    },
    activeStep: {
        opacity: 1,
    },
    switchContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    switchText: {
        fontSize: 14,
    },
    switchLink: {
        fontWeight: 'bold',
    },
    errorText2: {
        marginBottom: 10,
        textAlign: 'left',
        marginTop: -10,
    },
    errorOuterContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    errorIcon: {
        marginRight: 8,
    },
    errorText4: {
        fontSize: 14,
        flex: 1,
    },
    errorRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
}); 