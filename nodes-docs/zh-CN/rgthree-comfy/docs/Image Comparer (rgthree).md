
# Documentation
- Class name: Image Comparer (rgthree)
- Category: rgthree
- Output node: True

该节点为用户提供了一个比较两幅图像的界面,允许并排比较以评估差异或相似之处。

# Input types
## Required
- image_a
    - 要进行比较的主要图像。这是比较过程中的必需输入。
    - Comfy dtype: IMAGE
    - Python dtype: Tuple[torch.Tensor]
## Optional
- image_b
    - 要与主图像进行比较的次要图像。这个输入是可选的;如果未提供,可以使用'image_a'批次中的第二张图像。
    - Comfy dtype: IMAGE
    - Python dtype: Optional[Tuple[torch.Tensor]]

# Output types
该节点没有输出类型


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RgthreeImageComparer(PreviewImage):
  """A node that compares two images in the UI."""

  NAME = get_name('Image Comparer')
  CATEGORY = get_category()
  FUNCTION = "compare_images"

  @classmethod
  def INPUT_TYPES(cls):  # pylint: disable = invalid-name, missing-function-docstring
    return {
      "required": {
        "image_a": ("IMAGE",),
      },
      "optional": {
        "image_b": ("IMAGE",),
      },
      "hidden": {
        "prompt": "PROMPT",
        "extra_pnginfo": "EXTRA_PNGINFO"
      },
    }

  def compare_images(self,
                     image_a,
                     image_b=None,
                     filename_prefix="rgthree.compare.",
                     prompt=None,
                     extra_pnginfo=None):
    images = []
    images.append(image_a[0])
    if image_b is not None and len(image_b) > 0:
      images.append(image_b[0])
    elif len(image_a) > 1:
      images.append(image_b[1])
    else:
      raise ValueError(
        "You must supply two images; either both image_a & image_b, or two batch images in image_a")

    return self.save_images(images, filename_prefix, prompt, extra_pnginfo)

```
