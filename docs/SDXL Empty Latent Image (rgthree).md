
# Documentation
- Class name: SDXL Empty Latent Image (rgthree)
- Category: rgthree
- Output node: False

SDXL Empty Latent Image (rgthree)节点用于生成一个基于指定尺寸的空白潜在图像,并根据裁剪比例进行缩放。它主要作为图像生成过程的基础步骤,在进行进一步的操作或添加之前,创建一个初始的、空白的潜在空间。

# Input types
## Required
- dimensions
    - 指定要生成的潜在图像的尺寸,提供一系列预定义的尺寸选项,包括从横向到纵向以及正方形的各种宽高比。这个参数对于确定潜在图像的基本尺寸至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- clip_scale
    - 决定应用于潜在图像尺寸的缩放因子,影响裁剪区域的最终大小。这个参数在调整生成图像的分辨率方面起着重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- batch_size
    - 控制在单个批次中生成的潜在图像数量,允许同时高效处理多个图像。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- LATENT
    - 生成的空白潜在图像。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- CLIP_WIDTH
    - 将裁剪比例应用于原始尺寸后的裁剪区域宽度。
    - Comfy dtype: INT
    - Python dtype: int
- CLIP_HEIGHT
    - 将裁剪比例应用于原始尺寸后的裁剪区域高度。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `GPU`
- Common nodes:
    - KSamplerAdvanced //Inspire
    - KSampler //Inspire
    - SeedExplorer //Inspire



## Source code
```python
class RgthreeSDXLEmptyLatentImage:

  NAME = get_name('SDXL Empty Latent Image')
  CATEGORY = get_category()

  @classmethod
  def INPUT_TYPES(cls):  # pylint: disable = invalid-name, missing-function-docstring
    return {
      "required": {
        "dimensions": (
          [
            # 'Custom',
            '1536 x 640   (landscape)',
            '1344 x 768   (landscape)',
            '1216 x 832   (landscape)',
            '1152 x 896   (landscape)',
            '1024 x 1024  (square)',
            ' 896 x 1152  (portrait)',
            ' 832 x 1216  (portrait)',
            ' 768 x 1344  (portrait)',
            ' 640 x 1536  (portrait)',
          ],
          {
            "default": '1024 x 1024  (square)'
          }),
        "clip_scale": ("FLOAT", {
          "default": 2.0,
          "min": 1.0,
          "max": 10.0,
          "step": .5
        }),
        "batch_size": ("INT", {
          "default": 1,
          "min": 1,
          "max": 64
        }),
      },
      # "optional": {
      #   "custom_width": ("INT", {"min": 1, "max": MAX_RESOLUTION, "step": 64}),
      #   "custom_height": ("INT", {"min": 1, "max": MAX_RESOLUTION, "step": 64}),
      # }
    }

  RETURN_TYPES = ("LATENT", "INT", "INT")
  RETURN_NAMES = ("LATENT", "CLIP_WIDTH", "CLIP_HEIGHT")
  FUNCTION = "generate"

  def generate(self, dimensions, clip_scale, batch_size):
    """Generates the latent and exposes the clip_width and clip_height"""
    if True:
      result = [x.strip() for x in dimensions.split('x')]
      width = int(result[0])
      height = int(result[1].split(' ')[0])
    latent = EmptyLatentImage().generate(width, height, batch_size)[0]
    return (
      latent,
      int(width * clip_scale),
      int(height * clip_scale),
    )

```
