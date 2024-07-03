
# Documentation
- Class name: easy imagesSplitImage
- Category: EasyUse/Image
- Output node: False

easy imagesSplitImage节点旨在将单个图像张量分割成多个片段，将原始图像的内容分散到几个新的图像张量中。这种操作通过将图像数据分解成更易于管理的部分，便于对图像数据进行操作和分析。

# Input types
## Required
- images
    - images参数代表需要被分割成多个部分的输入图像张量。这个参数对于确定原始图像如何被划分至关重要，并直接影响最终生成的图像分段。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image1
    - 表示分割后的图像的第一个部分。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image2
    - 表示分割后的图像的第二个部分。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image3
    - 表示分割后的图像的第三个部分。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image4
    - 表示分割后的图像的第四个部分。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image5
    - 表示分割后的图像的第五个部分。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class imagesSplitImage:
    @classmethod
    def INPUT_TYPES(s):
        return {
          "required": {
              "images": ("IMAGE",),
          }
        }

    RETURN_TYPES = ("IMAGE", "IMAGE", "IMAGE", "IMAGE", "IMAGE")
    RETURN_NAMES = ("image1", "image2", "image3", "image4", "image5")
    FUNCTION = "split"
    CATEGORY = "EasyUse/Image"

    def split(self, images,):
      new_images = torch.chunk(images, len(images), dim=0)
      return new_images

```
