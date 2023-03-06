package com.curvedbottombar;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BlurMaskFilter;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Rect;
import android.view.View;
import android.view.ViewParent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Dynamic;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.views.view.ReactViewGroup;

public class ShadowLayout extends ReactViewGroup {
  public ShadowLayout(Context context) {
    super(context);
  }

  int mColor;
  float mRadius, mOpacity, dX, dY, x, y;
  Bitmap shadow = Bitmap.createBitmap(1, 1, Bitmap.Config.ARGB_8888);
  Bitmap content = Bitmap.createBitmap(1, 1, Bitmap.Config.ARGB_8888);
  final Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);
  final Paint blur = new Paint(Paint.ANTI_ALIAS_FLAG);
  final Canvas draw = new Canvas(content);
  boolean contentDirty, shadowDirty, hasContent, hasOpacity, hasRadius, hasColor, hasArea;

  @Override
  @SuppressWarnings("deprecation")
  public ViewParent invalidateChildInParent(final int[] location, final Rect dirty) {
    contentDirty = true;
    shadowDirty = true;
    return super.invalidateChildInParent(location, dirty);
  }

  @Override
  public void onDescendantInvalidated(@NonNull View child, @NonNull View target) {
    contentDirty = true;
    shadowDirty = true;
    super.onDescendantInvalidated(child, target);
    super.invalidate();
  }

  @Override
  public void invalidate() {
    contentDirty = true;
    shadowDirty = true;
    super.invalidate();
  }

  public void setShadowOffset(ReadableMap map) {
    boolean hasMap = map != null;
    if (hasMap && map.hasKey("width")) dX = (float) map.getDouble("width");
    else dX = 0f;
    if (hasMap && map.hasKey("height")) dY = (float) map.getDouble("height");
    else dY = 0f;
    dX = dX * this.getContext().getResources().getDisplayMetrics().density;
    dY = dY * this.getContext().getResources().getDisplayMetrics().density;
    super.invalidate();
  }

  public void setShadowColor(Integer color) {
    hasColor = color != null;
    if (hasColor && mColor != color) {
      paint.setColor(color);
      paint.setAlpha(Math.round(255 * mOpacity));
      mColor = color;
    }
    super.invalidate();
  }

  public void setShadowOpacity(Dynamic Opacity) {
    hasOpacity = Opacity != null && !Opacity.isNull();
    float opacity = hasOpacity ? (float) Opacity.asDouble() : 0f;
    hasOpacity &= opacity > 0f;
    if (hasOpacity && mOpacity != opacity) {
      paint.setColor(mColor);
      paint.setAlpha(Math.round(255 * opacity));
      mOpacity = opacity;
    }
    super.invalidate();
  }

  public void setShadowRadius(Dynamic Radius) {
    hasRadius = Radius != null && !Radius.isNull();
    float rawRadius = hasRadius ? (float) Radius.asDouble() : 0f;
    float radius = (rawRadius * 2) * this.getContext().getResources().getDisplayMetrics().density;
    hasRadius &= radius > 0f;
    if (hasRadius && mRadius != radius) {
      blur.setMaskFilter(new BlurMaskFilter(radius, BlurMaskFilter.Blur.NORMAL));
      mRadius = radius;
      shadowDirty = true;
    }
    super.invalidate();
  }


  @Override
  @SuppressLint("DrawAllocation")
  protected void onMeasure(int widthSpec, int heightSpec) {
    int height = MeasureSpec.getSize(heightSpec);
    int width = MeasureSpec.getSize(widthSpec);
    setMeasuredDimension(width, height);
    hasArea = width > 0 && height > 0;
    if (hasArea) {
      if (content.getWidth() == width && content.getHeight() == height) {
        return;
      }
      content.recycle();
      hasContent = false;
      content = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);
      draw.setBitmap(content);
    }
    invalidate();
  }

  @Override
  public void dispatchDraw(Canvas canvas) {
    if (hasArea) {
      if (contentDirty) {
        if (hasContent) content.eraseColor(Color.TRANSPARENT);
        super.dispatchDraw(draw);
        contentDirty = false;
        hasContent = true;
      }
      if (hasColor && hasOpacity) {
        if (shadowDirty) {
          shadow.recycle();
          shadow = content.extractAlpha(blur, null);
          shadowDirty = false;
        }
        x = dX - ((shadow.getWidth() - content.getWidth()) / 2);
        y = dY - ((shadow.getHeight() - content.getHeight()) / 2);
        canvas.drawBitmap(shadow, x, y, paint);
      }
      canvas.drawBitmap(content, 0f, 0f, null);
    }
    super.dispatchDraw(canvas);

  }
}
