import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CIRCLE_LENGTH = width * 0.7;
const BUTTON_SIZE = width * 0.45;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 30,
    },
    headerContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 40,
    },
    circleContainer: {
        width: CIRCLE_LENGTH,
        height: CIRCLE_LENGTH,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '35%',
    },
    ring: {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: BUTTON_SIZE / 2,
        borderWidth: 2,
        position: 'absolute',
        backgroundColor: 'transparent',
    },
    button: {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: BUTTON_SIZE / 2,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
    buttonStatus: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        marginTop: 8,
    },
    iconBackground: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    descriptionContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 20,
        borderRadius: 15,
        borderWidth: 1,
        marginHorizontal: 20,
        marginTop: CIRCLE_LENGTH + 40,
        marginBottom: -10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        maxWidth: width * 0.9,
        alignSelf: 'center',
    },
    descriptionText: {
        flex: 1,
        fontSize: 14,
        lineHeight: 20,
    },
    alertButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 10,
        width: '85%',
        marginBottom: 0,
    },
    alertButtonIcon: {
        marginRight: 8,
    },
    alertButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
}); 