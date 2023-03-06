package com.curvedbottombar;

import android.view.View;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Dynamic;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

public class CurvedBottomBarViewManager extends ViewGroupManager<ShadowLayout> {
  public static final String REACT_CLASS = "CurvedBottomBarView";

  public ShadowListener imageListener;

    @Override
    @NonNull
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected ShadowLayout createViewInstance(ThemedReactContext reactContext) {
        final ShadowLayout layout = new ShadowLayout(reactContext);
        if (this.imageListener == null) this.imageListener = new ShadowListener(reactContext);
        return layout;
    }

    @ReactProp(name = "shadowOffset")
    public void setShadowOffset(ShadowLayout view, ReadableMap offsetMap) {
        view.setShadowOffset(offsetMap);
    }

    @ReactProp(name = "shadowColor")
    public void setShadowColor(ShadowLayout view, Integer color) {
        view.setShadowColor(color);
    }

    @ReactProp(name = "shadowOpacity")
    public void setShadowOpacity(ShadowLayout view, Dynamic opacity) {
        view.setShadowOpacity(opacity);
    }

    @ReactProp(name = "shadowRadius")
    public void setShadowRadius(ShadowLayout view, Dynamic radius) {
        view.setShadowRadius(radius);
    }

    @Override
    public void addView(ShadowLayout parent, View child, int index) {
        this.imageListener.onAddView(parent, child);
        super.addView(parent, child, index);
    }

    @Override
    public void onDropViewInstance(ShadowLayout parent) {
        this.imageListener.tearDown();
    }
}
