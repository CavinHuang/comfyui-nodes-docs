# NormalizedAmplitudeToMask
## Documentation
- Class name: `NormalizedAmplitudeToMask`
- Category: `KJNodes/audio`
- Output node: `False`

This node is designed to convert normalized amplitude values from audio signals into masks, applying a transformation that maps the amplitude range to a corresponding visual representation. It emphasizes the integration of audio data with visual elements, enabling dynamic adjustments to visual content based on audio input.
## Input types
### Required
- **`normalized_amp`**
    - The normalized amplitude values, expected to be in the range [0, 1], serve as the basis for generating masks. These values dictate the intensity and characteristics of the resulting visual masks, directly influencing the visual output.
    - Comfy dtype: `NORMALIZED_AMPLITUDE`
    - Python dtype: `numpy.ndarray`
- **`width`**
    - Specifies the width of the output mask, allowing for customization of the mask's dimensions based on the requirements of the visual representation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Determines the height of the output mask, enabling adjustment of the mask's size to fit specific visual contexts.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`frame_offset`**
    - An integer value used to offset the amplitude values, providing a means to shift the visual representation of the mask in relation to the audio input.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`location_x`**
    - The x-coordinate location where the mask will be applied, allowing for precise positioning of the visual effect within the larger image or scene.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`location_y`**
    - The y-coordinate location for the mask application, facilitating accurate placement of the audio-induced visual effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`size`**
    - Defines the size of the mask, offering control over the scale of the visual effect generated from the audio amplitude.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`shape`**
    - Allows selection of the mask's shape, providing options such as 'none', 'circle', 'square', and 'triangle' to customize the visual outcome.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`color`**
    - Chooses the color scheme of the mask, with options like 'white' and 'amplitude' to influence the visual appearance based on the audio input.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output mask generated from the normalized amplitude values, where the amplitude information is visually encoded into the mask's structure.
    - Python dtype: `torch.Tensor`
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
