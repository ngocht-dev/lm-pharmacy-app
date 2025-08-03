import ROUTES from '@/navigation/routes';
import { RootStackParamList } from '@/navigation/types';
import { NavigationContainerRef, StackActions } from '@react-navigation/native';
import React from 'react';

export const navigationRef =
  React.createRef<NavigationContainerRef<RootStackParamList>>();

export class NavigationUtil {
  static reset(name?: keyof RootStackParamList) {
    if (navigationRef.current) {
      navigationRef.current.reset({
        index: 0,
        routes: [{ name: name || ROUTES.AUTH.LOGIN }],
      });
    }
  }

  static navigate(screen: keyof RootStackParamList, params?: any) {
    if (navigationRef.current) {
      navigationRef.current.navigate(screen, params);
    }
  }

  static replace(screen: keyof RootStackParamList, params?: any) {
    if (navigationRef.current) {
      navigationRef.current.dispatch(StackActions.replace(screen, params));
    }
  }

  static pop(count?: number) {
    if (navigationRef.current) {
      navigationRef.current.dispatch(StackActions.pop(count));
    }
  }

  static popToTop() {
    if (navigationRef.current) {
      navigationRef.current.dispatch(StackActions.popToTop());
    }
  }

  static goBack() {
    if (navigationRef.current) {
      navigationRef.current.goBack();
    }
  }
}
