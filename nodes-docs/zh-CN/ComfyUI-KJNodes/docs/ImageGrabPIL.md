
# Documentation
- Class name: ImageGrabPIL
- Category: KJNodes/experimental
- Output node: False

ImageGrabPIL节点使用PIL库从屏幕捕获和处理图像。它主要用于抓取屏幕内容，可能用于更大的图像处理或计算机视觉工作流程中的进一步操作或分析。

# Input types
## Required
- x
    - 指定屏幕捕获区域的起始x坐标，影响捕获区域的水平位置。
    - Comfy dtype: INT
    - Python dtype: int
- y
    - 指定屏幕捕获区域的起始y坐标，影响捕获区域的垂直位置。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - 定义屏幕捕获区域的宽度，决定捕获图像的宽度。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 定义屏幕捕获区域的高度，决定捕获图像的高度。
    - Comfy dtype: INT
    - Python dtype: int
- num_frames
    - 表示要捕获的帧数，用于创建一系列随时间变化的图像。
    - Comfy dtype: INT
    - Python dtype: int
- delay
    - 设置在捕获多个帧时的延迟时间，控制捕获的时间间隔。
    - Comfy dtype: FLOAT
    - Python dtype: int

# Output types
- image
    - 从指定屏幕区域捕获的图像或图像序列。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [VAEEncode](../../Comfy/Nodes/VAEEncode.md)
    - [CannyEdgePreprocessor](../../comfyui_controlnet_aux/Nodes/CannyEdgePreprocessor.md)
    - [PixelPerfectResolution](../../comfyui_controlnet_aux/Nodes/PixelPerfectResolution.md)



## Source code
```python
class ImageGrabPIL:

    @classmethod
    def IS_CHANGED(cls):

        return

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = "screencap"
    CATEGORY = "KJNodes/experimental"
    DESCRIPTION = """
Captures an area specified by screen coordinates.  
Can be used for realtime diffusion with autoqueue.
"""

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                 "x": ("INT", {"default": 0,"min": 0, "max": 4096, "step": 1}),
                 "y": ("INT", {"default": 0,"min": 0, "max": 4096, "step": 1}),
                 "width": ("INT", {"default": 512,"min": 0, "max": 4096, "step": 1}),
                 "height": ("INT", {"default": 512,"min": 0, "max": 4096, "step": 1}),
                 "num_frames": ("INT", {"default": 1,"min": 1, "max": 255, "step": 1}),
                 "delay": ("FLOAT", {"default": 0.1,"min": 0.0, "max": 10.0, "step": 0.01}),
        },
    } 

    def screencap(self, x, y, width, height, num_frames, delay):
        captures = []
        bbox = (x, y, x + width, y + height)
        
        for _ in range(num_frames):
            # Capture screen
            screen_capture = ImageGrab.grab(bbox=bbox)
            screen_capture_torch = torch.tensor(np.array(screen_capture), dtype=torch.float32) / 255.0
            screen_capture_torch = screen_capture_torch.unsqueeze(0)
            captures.append(screen_capture_torch)
            
            # Wait for a short delay if more than one frame is to be captured
            if num_frames > 1:
                time.sleep(delay)
        
        return (torch.cat(captures, dim=0),)

```
