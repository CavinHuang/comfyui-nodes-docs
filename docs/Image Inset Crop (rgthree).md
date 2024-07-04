
# Documentation
- Class name: Image Inset Crop (rgthree)
- Category: rgthree
- Output node: False

Image Inset Crop (rgthree)节点允许用户基于指定的内嵌值（可以用像素或百分比定义）来裁剪图像。这一功能实现了对裁剪区域的精确控制，使用户能够根据需要调整图像的可见部分。

# Input types
## Required
- image
    - 待裁剪的图像。这个输入对于定义将要进行裁剪操作的源图像至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- measurement
    - 指定内嵌值的度量单位（像素或百分比）。这决定了如何解释和应用内嵌值到裁剪操作中。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- left
    - 从图像左边缘的内嵌值。这定义了图像左侧将被裁剪多少。
    - Comfy dtype: INT
    - Python dtype: int
- right
    - 从图像右边缘的内嵌值。这定义了图像右侧将被裁剪多少。
    - Comfy dtype: INT
    - Python dtype: int
- top
    - 从图像上边缘的内嵌值。这定义了图像顶部将被裁剪多少。
    - Comfy dtype: INT
    - Python dtype: int
- bottom
    - 从图像下边缘的内嵌值。这定义了图像底部将被裁剪多少。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 根据指定的内嵌值调整后的裁剪图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RgthreeImageInsetCrop:
  """Image Inset Crop, with percentages."""

  NAME = get_name('Image Inset Crop')
  CATEGORY = get_category()

  @classmethod
  def INPUT_TYPES(cls):  # pylint: disable = invalid-name, missing-function-docstring
    return {
      "required": {
        "image": ("IMAGE",),
        "measurement": (['Pixels', 'Percentage'],),
        "left": ("INT", {
          "default": 0,
          "min": 0,
          "max": MAX_RESOLUTION,
          "step": 8
        }),
        "right": ("INT", {
          "default": 0,
          "min": 0,
          "max": MAX_RESOLUTION,
          "step": 8
        }),
        "top": ("INT", {
          "default": 0,
          "min": 0,
          "max": MAX_RESOLUTION,
          "step": 8
        }),
        "bottom": ("INT", {
          "default": 0,
          "min": 0,
          "max": MAX_RESOLUTION,
          "step": 8
        }),
      },
    }

  RETURN_TYPES = ("IMAGE",)
  FUNCTION = "crop"

  # pylint: disable = too-many-arguments
  def crop(self, measurement, left, right, top, bottom, image=None):
    """Does the crop."""

    _, height, width, _ = image.shape

    if measurement == 'Percentage':
      left = int(width - (width * (100 - left) / 100))
      right = int(width - (width * (100 - right) / 100))
      top = int(height - (height * (100 - top) / 100))
      bottom = int(height - (height * (100 - bottom) / 100))

    # Snap to 8 pixels
    left = left // 8 * 8
    right = right // 8 * 8
    top = top // 8 * 8
    bottom = bottom // 8 * 8

    if left == 0 and right == 0 and bottom == 0 and top == 0:
      return (image,)

    inset_left, inset_right, inset_top, inset_bottom = get_new_bounds(width, height, left, right,
                                                                      top, bottom)
    if inset_top > inset_bottom:
      raise ValueError(
        f"Invalid cropping dimensions top ({inset_top}) exceeds bottom ({inset_bottom})")
    if inset_left > inset_right:
      raise ValueError(
        f"Invalid cropping dimensions left ({inset_left}) exceeds right ({inset_right})")

    log_node_info(
      self.NAME, f'Cropping image {width}x{height} width inset by {inset_left},{inset_right}, ' +
      f'and height inset by {inset_top}, {inset_bottom}')
    image = image[:, inset_top:inset_bottom, inset_left:inset_right, :]

    return (image,)

```
