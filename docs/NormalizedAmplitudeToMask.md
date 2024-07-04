
# Documentation
- Class name: NormalizedAmplitudeToMask
- Category: KJNodes/audio
- Output node: False

NormalizedAmplitudeToMask节点用于将音频信号的归一化幅值转换为视觉掩码。它通过将幅值范围映射到相应的视觉表示，实现了音频数据与视觉元素的融合。这使得可以根据音频输入动态调整视觉内容。

# Input types
## Required
- normalized_amp
    - 归一化的幅值，预期范围为[0, 1]，作为生成掩码的基础。这些值决定了生成的视觉掩码的强度和特征，直接影响视觉输出。
    - Comfy dtype: NORMALIZED_AMPLITUDE
    - Python dtype: numpy.ndarray
- width
    - 指定输出掩码的宽度，允许根据视觉表示的需求自定义掩码的尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 决定输出掩码的高度，使掩码的大小能够适应特定的视觉环境。
    - Comfy dtype: INT
    - Python dtype: int
- frame_offset
    - 用于偏移幅值的整数值，提供了一种方法来调整掩码的视觉表示相对于音频输入的位置。
    - Comfy dtype: INT
    - Python dtype: int
- location_x
    - 掩码将被应用的x坐标位置，允许在更大的图像或场景中精确定位视觉效果。
    - Comfy dtype: INT
    - Python dtype: int
- location_y
    - 掩码应用的y坐标位置，有助于准确放置由音频引起的视觉效果。
    - Comfy dtype: INT
    - Python dtype: int
- size
    - 定义掩码的大小，提供对从音频幅值生成的视觉效果规模的控制。
    - Comfy dtype: INT
    - Python dtype: int
- shape
    - 允许选择掩码的形状，提供诸如'none'、'circle'、'square'和'triangle'等选项来自定义视觉效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- color
    - 选择掩码的颜色方案，提供'white'和'amplitude'等选项，以根据音频输入影响视觉外观。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- mask
    - 从归一化幅值生成的输出掩码，其中幅值信息被视觉编码到掩码的结构中。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class NormalizedAmplitudeToMask:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "normalized_amp": ("NORMALIZED_AMPLITUDE",),
                    "width": ("INT", {"default": 512,"min": 16, "max": 4096, "step": 1}),
                    "height": ("INT", {"default": 512,"min": 16, "max": 4096, "step": 1}),
                    "frame_offset": ("INT", {"default": 0,"min": -255, "max": 255, "step": 1}),
                    "location_x": ("INT", {"default": 256,"min": 0, "max": 4096, "step": 1}),
                    "location_y": ("INT", {"default": 256,"min": 0, "max": 4096, "step": 1}),
                    "size": ("INT", {"default": 128,"min": 8, "max": 4096, "step": 1}),
                    "shape": (
                        [   
                            'none',
                            'circle',
                            'square',
                            'triangle',
                        ],
                        {
                        "default": 'none'
                        }),
                    "color": (
                        [   
                            'white',
                            'amplitude',
                        ],
                        {
                        "default": 'amplitude'
                        }),
                     },}

    CATEGORY = "KJNodes/audio"
    RETURN_TYPES = ("MASK",)
    FUNCTION = "convert"
    DESCRIPTION = """
Works as a bridge to the AudioScheduler -nodes:  
https://github.com/a1lazydog/ComfyUI-AudioScheduler  
Creates masks based on the normalized amplitude.
"""

    def convert(self, normalized_amp, width, height, frame_offset, shape, location_x, location_y, size, color):
        # Ensure normalized_amp is an array and within the range [0, 1]
        normalized_amp = np.clip(normalized_amp, 0.0, 1.0)

        # Offset the amplitude values by rolling the array
        normalized_amp = np.roll(normalized_amp, frame_offset)
        
        # Initialize an empty list to hold the image tensors
        out = []
        # Iterate over each amplitude value to create an image
        for amp in normalized_amp:
            # Scale the amplitude value to cover the full range of grayscale values
            if color == 'amplitude':
                grayscale_value = int(amp * 255)
            elif color == 'white':
                grayscale_value = 255
            # Convert the grayscale value to an RGB format
            gray_color = (grayscale_value, grayscale_value, grayscale_value)
            finalsize = size * amp
            
            if shape == 'none':
                shapeimage = Image.new("RGB", (width, height), gray_color)
            else:
                shapeimage = Image.new("RGB", (width, height), "black")

            draw = ImageDraw.Draw(shapeimage)
            if shape == 'circle' or shape == 'square':
                # Define the bounding box for the shape
                left_up_point = (location_x - finalsize, location_y - finalsize)
                right_down_point = (location_x + finalsize,location_y + finalsize)
                two_points = [left_up_point, right_down_point]

                if shape == 'circle':
                    draw.ellipse(two_points, fill=gray_color)
                elif shape == 'square':
                    draw.rectangle(two_points, fill=gray_color)
                    
            elif shape == 'triangle':
                # Define the points for the triangle
                left_up_point = (location_x - finalsize, location_y + finalsize) # bottom left
                right_down_point = (location_x + finalsize, location_y + finalsize) # bottom right
                top_point = (location_x, location_y) # top point
                draw.polygon([top_point, left_up_point, right_down_point], fill=gray_color)
            
            shapeimage = pil2tensor(shapeimage)
            mask = shapeimage[:, :, :, 0]
            out.append(mask)
        
        return (torch.cat(out, dim=0),)

```
