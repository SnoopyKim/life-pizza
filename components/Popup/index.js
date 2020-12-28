import React, { createRef, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { THEME_COLORS } from '../../style/color';
import Loading from './Loading';
import Alert from './Alert';

const Popup = forwardRef((props, ref) => {
    const [dialog, setDialog] = useState(null);

    useImperativeHandle(ref, () => ({
        setLoading: (status) => {
            setDialog(status ? <Loading /> : null);
        },
        setAlert: (status, message) => {
            setDialog(status ? <Alert message={message} /> : null);
        },
    }));

    if (dialog === null) {
        return;
    }
    return <View style={styles.background}>{dialog}</View>;
});

const popupRef = createRef();

const PopupWrapper = ({ children }) => {
    return (
        <View style={{ flex: 1 }}>
            {children}
            <Popup ref={popupRef} />
        </View>
    );
};

export default PopupWrapper;

export const setLoading = (status) => {
    popupRef.current.setLoading(status);
};
export const setAlert = (status, message) => {
    popupRef.current.setAlert(status, message);
};

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: THEME_COLORS.TRANS_BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        opacity: 1,
        backgroundColor: THEME_COLORS.GRAY_50,
        elevation: 2,
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    message: {
        fontSize: 16,
    },
});
