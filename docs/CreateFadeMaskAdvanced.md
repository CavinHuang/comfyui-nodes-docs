
# Documentation
- Class name: CreateFadeMaskAdvanced
- Category: KJNodes/masking/generate
- Output node: False

CreateFadeMaskAdvanced节点用于生成高级淡入淡出蒙版，具有可自定义的参数，可以精细控制淡入淡出效果的进展、强度和空间分布。它能够在图像序列或动画中创建动态的视觉过渡效果。

# Input types
## Required
- points_string
    - 定义一个点字符串，包含特定帧上的点及其对应的蒙版值，用于在序列中生成淡入淡出效果。
    - Comfy dtype: STRING
    - Python dtype: str
- invert
    - 一个布尔标志，用于反转蒙版值，允许创建反向的淡入淡出效果。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- frames
    - 指定蒙版序列的总帧数，决定动画的长度。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - 设置蒙版的宽度，定义生成蒙版的水平尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 设置蒙版的高度，定义生成蒙版的垂直尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- interpolation
    - 选择在帧之间过渡蒙版值的插值方法，影响淡入淡出效果的平滑度和风格。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- mask
    - 输出根据指定参数生成的一批蒙版，适用于在图像序列中创建淡入淡出效果。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CreateFadeMaskAdvanced:
    
    RETURN_TYPES = ("MASK",)
    FUNCTION = "createfademask"
    CATEGORY = "KJNodes/masking/generate"
    DESCRIPTION = """
Create a batch of masks interpolated between given frames and values. 
Uses same syntax as Fizz' BatchValueSchedule.
First value is the frame index (not that this starts from 0, not 1) 
and the second value inside the brackets is the float value of the mask in range 0.0 - 1.0  

For example the default values:  
0:(0.0)  
7:(1.0)  
15:(0.0)  
  
Would create a mask batch fo 16 frames, starting from black, 
interpolating with the chosen curve to fully white at the 8th frame, 
and interpolating from that to fully black at the 16th frame.
"""

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                 "points_string": ("STRING", {"default": "0:(0.0),\n7:(1.0),\n15:(0.0)\n", "multiline": True}),
                 "invert": ("BOOLEAN", {"default": False}),
                 "frames": ("INT", {"default": 16,"min": 2, "max": 255, "step": 1}),
                 "width": ("INT", {"default": 512,"min": 1, "max": 4096, "step": 1}),
                 "height": ("INT", {"default": 512,"min": 1, "max": 4096, "step": 1}),
                 "interpolation": (["linear", "ease_in", "ease_out", "ease_in_out"],),
        },
    } 
    
    def createfademask(self, frames, width, height, invert, points_string, interpolation):
        def ease_in(t):
            return t * t
        
        def ease_out(t):
            return 1 - (1 - t) * (1 - t)

        def ease_in_out(t):
            return 3 * t * t - 2 * t * t * t
        
        # Parse the input string into a list of tuples
        points = []
        points_string = points_string.rstrip(',\n')
        for point_str in points_string.split(','):
            frame_str, color_str = point_str.split(':')
            frame = int(frame_str.strip())
            color = float(color_str.strip()[1:-1])  # Remove parentheses around color
            points.append((frame, color))

        # Check if the last frame is already in the points
        if len(points) == 0 or points[-1][0] != frames - 1:
            # If not, add it with the color of the last specified frame
            points.append((frames - 1, points[-1][1] if points else 0))

        # Sort the points by frame number
        points.sort(key=lambda x: x[0])

        batch_size = frames
        out = []
        image_batch = np.zeros((batch_size, height, width), dtype=np.float32)

        # Index of the next point to interpolate towards
        next_point = 1

        for i in range(batch_size):
            while next_point < len(points) and i > points[next_point][0]:
                next_point += 1

            # Interpolate between the previous point and the next point
            prev_point = next_point - 1
            t = (i - points[prev_point][0]) / (points[next_point][0] - points[prev_point][0])
            if interpolation == "ease_in":
                t = ease_in(t)
            elif interpolation == "ease_out":
                t = ease_out(t)
            elif interpolation == "ease_in_out":
                t = ease_in_out(t)
            elif interpolation == "linear":
                pass  # No need to modify `t` for linear interpolation

            color = points[prev_point][1] - t * (points[prev_point][1] - points[next_point][1])
            color = np.clip(color, 0, 255)
            image = np.full((height, width), color, dtype=np.float32)
            image_batch[i] = image

        output = torch.from_numpy(image_batch)
        mask = output
        out.append(mask)

        if invert:
            return (1.0 - torch.cat(out, dim=0),)
        return (torch.cat(out, dim=0),)

```
