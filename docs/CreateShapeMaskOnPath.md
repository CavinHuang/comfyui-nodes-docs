
# Documentation
- Class name: CreateShapeMaskOnPath
- Category: KJNodes/masking/generate
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

CreateShapeMaskOnPath节点用于沿指定路径生成基于形状的遮罩，能够创建动态和动画化的遮罩效果。它利用形状参数和路径坐标来制作可随时间变化的遮罩，为视觉效果和图像处理提供了一个多功能工具。

# Input types
## Required
- shape
    - 指定要创建的遮罩的几何形状。这个选择影响遮罩的外观，可以是圆形、正方形或三角形，为遮罩提供多种视觉风格选择。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- coordinates
    - 定义遮罩创建沿路径的中心位置。这些坐标决定了遮罩在画面中的放置位置，允许精确控制遮罩的位置。
    - Comfy dtype: STRING
    - Python dtype: str
- grow
    - 决定每一帧中形状增长的量，使得可以创建随时间变化大小的动画遮罩。
    - Comfy dtype: INT
    - Python dtype: int
- frame_width
    - 设置创建遮罩的帧的宽度，定义了遮罩生成的空间边界。
    - Comfy dtype: INT
    - Python dtype: int
- frame_height
    - 设置创建遮罩的帧的高度，定义了遮罩生成的空间边界。
    - Comfy dtype: INT
    - Python dtype: int
- shape_width
    - 指定用于创建遮罩的形状的初始宽度，影响遮罩的大小和覆盖区域。
    - Comfy dtype: INT
    - Python dtype: int
- shape_height
    - 指定用于创建遮罩的形状的初始高度，影响遮罩的大小和覆盖区域。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- mask
    - 根据指定的形状和路径坐标创建的主要输出遮罩。
    - Comfy dtype: MASK
    - Python dtype: Tensor
- mask_inverted
    - 主要遮罩的反转版本，提供了另一种遮罩选项，其中形状区域是透明的，而周围区域是不透明的。
    - Comfy dtype: MASK
    - Python dtype: Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CreateShapeMaskOnPath:
    
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
                "coordinates": ("STRING", {"forceInput": True}),
                "grow": ("INT", {"default": 0, "min": -512, "max": 512, "step": 1}),
                "frame_width": ("INT", {"default": 512,"min": 16, "max": 4096, "step": 1}),
                "frame_height": ("INT", {"default": 512,"min": 16, "max": 4096, "step": 1}),
                "shape_width": ("INT", {"default": 128,"min": 8, "max": 4096, "step": 1}),
                "shape_height": ("INT", {"default": 128,"min": 8, "max": 4096, "step": 1}),
        },
    } 

    def createshapemask(self, coordinates, frame_width, frame_height, shape_width, shape_height, grow, shape):
        # Define the number of images in the batch
        coordinates = coordinates.replace("'", '"')
        coordinates = json.loads(coordinates)

        batch_size = len(coordinates)
        out = []
        color = "white"
        
        for i, coord in enumerate(coordinates):
            image = Image.new("RGB", (frame_width, frame_height), "black")
            draw = ImageDraw.Draw(image)

            # Calculate the size for this frame and ensure it's not less than 0
            current_width = max(0, shape_width + i*grow)
            current_height = max(0, shape_height + i*grow)

            location_x = coord['x']
            location_y = coord['y']

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
