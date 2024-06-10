---
tags:
- ImageTransformation
- VisualEffects
---

# ImageGrabPIL
## Documentation
- Class name: `ImageGrabPIL`
- Category: `KJNodes/experimental`
- Output node: `False`

The ImageGrabPIL node is designed to capture and process images from the screen using the PIL library. It focuses on grabbing screen content, possibly for further manipulation or analysis within a larger image processing or computer vision workflow.
## Input types
### Required
- **`x`**
    - Specifies the starting x-coordinate for the screen capture area, affecting the horizontal position of the capture region.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`y`**
    - Specifies the starting y-coordinate for the screen capture area, influencing the vertical position of the capture region.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`width`**
    - Defines the width of the screen capture area, determining how wide the captured image will be.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Defines the height of the screen capture area, determining the height of the captured image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`num_frames`**
    - Indicates the number of frames to capture, useful for creating a sequence of images over time.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`delay`**
    - Sets the delay between captures when multiple frames are being captured, controlling the timing of captures.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The captured image or sequence of images from the specified screen area.
    - Python dtype: `PIL.Image.Image`
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
