
# Documentation
- Class name: CreateShapeMask
- Category: KJNodes/masking/generate
- Output node: False
- Repo Ref: https://github.com/kenjiqq/ComfyUI_KJNodes

CreateShapeMask是一个专用于生成特定形状的掩码或多帧掩码批次的节点。它允许通过调整形状在不同帧之间的生长来动态创建动画掩码，为在各种尺寸和形状下生成掩码提供了一个多功能的工具。

# Input types
## Required
- shape
    - 指定要创建的掩码的几何形状。这个选择会影响生成的掩码的视觉外观和边界。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- frames
    - 确定动画掩码的帧数，允许创建一系列逐渐生长的掩码序列。
    - Comfy dtype: INT
    - Python dtype: int
- location_x
    - 形状中心位置的x坐标，定义了形状在帧内水平方向上的位置。
    - Comfy dtype: INT
    - Python dtype: int
- location_y
    - 形状中心位置的y坐标，定义了形状在帧内垂直方向上的位置。
    - Comfy dtype: INT
    - Python dtype: int
- grow
    - 控制每一帧中形状增长的量，使掩码能够产生动画效果。
    - Comfy dtype: INT
    - Python dtype: int
- frame_width
    - 放置形状的帧的宽度，设置掩码的水平边界。
    - Comfy dtype: INT
    - Python dtype: int
- frame_height
    - 放置形状的帧的高度，设置掩码的垂直边界。
    - Comfy dtype: INT
    - Python dtype: int
- shape_width
    - 指定形状的初始宽度，决定了在应用任何增长前的尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- shape_height
    - 指定形状的初始高度，决定了在应用任何增长前的尺寸。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- mask
    - 具有指定形状和尺寸的生成掩码。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- mask_inverted
    - 生成掩码的反转版本，其中形状区域是透明的，其余部分是不透明的。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [MaskToImage](../../Comfy/Nodes/MaskToImage.md)



## Source code
```python
class CreateShapeMask:
    
    RETURN_TYPES = ("MASK", "MASK",)
    RETURN_NAMES = ("mask", "mask_inverted",)
    FUNCTION = "createshapemask"
    CATEGORY = "KJNodes/masking/generate"
    DESCRIPTION = """
Creates a mask or batch of masks with the specified shape.  
Locations are center locations.  
Grow value is the amount to grow the shape on each frame, creating animated masks.
"""

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "shape": (
            [   'circle',
                'square',
                'triangle',
            ],
            {
            "default": 'circle'
             }),
                "frames": ("INT", {"default": 1,"min": 1, "max": 4096, "step": 1}),
                "location_x": ("INT", {"default": 256,"min": 0, "max": 4096, "step": 1}),
                "location_y": ("INT", {"default": 256,"min": 0, "max": 4096, "step": 1}),
                "grow": ("INT", {"default": 0, "min": -512, "max": 512, "step": 1}),
                "frame_width": ("INT", {"default": 512,"min": 16, "max": 4096, "step": 1}),
                "frame_height": ("INT", {"default": 512,"min": 16, "max": 4096, "step": 1}),
                "shape_width": ("INT", {"default": 128,"min": 8, "max": 4096, "step": 1}),
                "shape_height": ("INT", {"default": 128,"min": 8, "max": 4096, "step": 1}),
        },
    } 

    def createshapemask(self, frames, frame_width, frame_height, location_x, location_y, shape_width, shape_height, grow, shape):
        # Define the number of images in the batch
        batch_size = frames
        out = []
        color = "white"
        for i in range(batch_size):
            image = Image.new("RGB", (frame_width, frame_height), "black")
            draw = ImageDraw.Draw(image)

            # Calculate the size for this frame and ensure it's not less than 0
            current_width = max(0, shape_width + i*grow)
            current_height = max(0, shape_height + i*grow)

            if shape == 'circle' or shape == 'square':
                # Define the bounding box for the shape
                left_up_point = (location_x - current_width // 2, location_y - current_height // 2)
                right_down_point = (location_x + current_width // 2, location_y + current_height // 2)
                two_points = [left_up_point, right_down_point]

                if shape == 'circle':
                    draw.ellipse(two_points, fill=color)
                elif shape == 'square':
                    draw.rectangle(two_points, fill=color)
                    
            elif shape == 'triangle':
                # Define the points for the triangle
                left_up_point = (location_x - current_width // 2, location_y + current_height // 2) # bottom left
                right_down_point = (location_x + current_width // 2, location_y + current_height // 2) # bottom right
                top_point = (location_x, location_y - current_height // 2) # top point
                draw.polygon([top_point, left_up_point, right_down_point], fill=color)

            image = pil2tensor(image)
            mask = image[:, :, :, 0]
            out.append(mask)
        outstack = torch.cat(out, dim=0)
        return (outstack, 1.0 - outstack,)

```
