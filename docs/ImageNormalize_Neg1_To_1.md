
# Documentation
- Class name: ImageNormalize_Neg1_To_1
- Category: KJNodes/misc
- Output node: False

ImageNormalize_Neg1_To_1节点将图像像素值标准化到-1到1的范围内。这个过程调整像素值以适应这个尺度，旨在标准化图像数据，使其适合后续处理或作为需要归一化数据的模型输入。

# Input types
## Required
- images
    - 需要进行标准化的图像。这个标准化过程会调整像素值，确保它们落在-1到1的范围内，这对于保持图像处理任务的一致性至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 标准化后的图像，像素值已调整到-1到1的范围内。这种标准化对于期望输入数据被归一化的模型来说是必不可少的。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageNormalize_Neg1_To_1:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { 
                              "images": ("IMAGE",),
    
                              }}
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "normalize"
    CATEGORY = "KJNodes/misc"
    DESCRIPTION = """
Normalize the images to be in the range [-1, 1]  
"""

    def normalize(self,images):
        images = images * 2.0 - 1.0
        return (images,)    

```
