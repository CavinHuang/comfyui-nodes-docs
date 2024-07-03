
# Documentation
- Class name: ColorToMask
- Category: KJNodes/masking
- Output node: False

ColorToMask节点旨在将图像中指定的RGB颜色转换为掩码。该过程涉及分析图像以识别与给定RGB值匹配的像素，并基于这些像素创建掩码。它支持批处理，允许同时处理多个图像，并可控制批处理大小。

# Input types
## Required
- images
    - 要处理的图像。此参数对于定义将在其上执行RGB到掩码转换的输入图像至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- invert
    - 一个用于反转掩码的布尔标志。当设置为True时，将对不匹配指定RGB颜色的区域进行掩码处理。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- red
    - 要转换为掩码的RGB颜色的红色分量。
    - Comfy dtype: INT
    - Python dtype: int
- green
    - 要转换为掩码的RGB颜色的绿色分量。
    - Comfy dtype: INT
    - Python dtype: int
- blue
    - 要转换为掩码的RGB颜色的蓝色分量。
    - Comfy dtype: INT
    - Python dtype: int
- threshold
    - 颜色匹配的阈值。在指定RGB颜色的这个阈值范围内的像素将被包含在掩码中。
    - Comfy dtype: INT
    - Python dtype: int
- per_batch
    - 控制在单个批次中处理的图像数量，允许高效地批量处理图像。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- mask
    - 通过识别在阈值范围内匹配指定RGB颜色的像素生成的输出掩码。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ColorToMask:
    
    RETURN_TYPES = ("MASK",)
    FUNCTION = "clip"
    CATEGORY = "KJNodes/masking"
    DESCRIPTION = """
Converts chosen RGB value to a mask.  
With batch inputs, the **per_batch**  
controls the number of images processed at once.
"""

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                 "images": ("IMAGE",),
                 "invert": ("BOOLEAN", {"default": False}),
                 "red": ("INT", {"default": 0,"min": 0, "max": 255, "step": 1}),
                 "green": ("INT", {"default": 0,"min": 0, "max": 255, "step": 1}),
                 "blue": ("INT", {"default": 0,"min": 0, "max": 255, "step": 1}),
                 "threshold": ("INT", {"default": 10,"min": 0, "max": 255, "step": 1}),
                 "per_batch": ("INT", {"default": 16, "min": 1, "max": 4096, "step": 1}),
        },
    } 

    def clip(self, images, red, green, blue, threshold, invert, per_batch):

        color = torch.tensor([red, green, blue], dtype=torch.uint8)  
        black = torch.tensor([0, 0, 0], dtype=torch.uint8)
        white = torch.tensor([255, 255, 255], dtype=torch.uint8)
        
        if invert:
            black, white = white, black

        steps = images.shape[0]
        pbar = comfy.utils.ProgressBar(steps)
        tensors_out = []
        
        for start_idx in range(0, images.shape[0], per_batch):

            # Calculate color distances
            color_distances = torch.norm(images[start_idx:start_idx+per_batch] * 255 - color, dim=-1)
            
            # Create a mask based on the threshold
            mask = color_distances <= threshold
            
            # Apply the mask to create new images
            mask_out = torch.where(mask.unsqueeze(-1), white, black).float()
            mask_out = mask_out.mean(dim=-1)

            tensors_out.append(mask_out.cpu())
            batch_count = mask_out.shape[0]
            pbar.update(batch_count)
       
        tensors_out = torch.cat(tensors_out, dim=0)
        tensors_out = torch.clamp(tensors_out, min=0.0, max=1.0)
        return tensors_out,

```
