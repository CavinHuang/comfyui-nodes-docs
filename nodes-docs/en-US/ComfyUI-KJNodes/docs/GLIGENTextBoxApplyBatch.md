---
tags:
- CLIP
- Conditioning
---

# GLIGENTextBoxApplyBatch
## Documentation
- Class name: `GLIGENTextBoxApplyBatch`
- Category: `KJNodes/experimental`
- Output node: `False`

The GLIGENTextBoxApplyBatch node is designed for batch processing of text box applications, enabling the efficient application of text overlays or modifications across multiple images or frames in a batch operation. This node streamlines the process of adding text to images, making it ideal for scenarios where consistent text elements need to be applied to a series of images, such as in video frames or a collection of related images.
## Input types
### Required
- **`conditioning_to`**
    - This input specifies the target conditioning data to which the text box modifications will be applied, serving as the foundation for the text overlay process.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `list`
- **`latents`**
    - The 'latents' input provides the latent representations of images in the batch, which are used as the basis for applying text box modifications.
    - Comfy dtype: `LATENT`
    - Python dtype: `list`
- **`clip`**
    - This input represents the CLIP model used for encoding text inputs, facilitating the generation of text-based features that are applied to the images.
    - Comfy dtype: `CLIP`
    - Python dtype: `object`
- **`gligen_textbox_model`**
    - The 'gligen_textbox_model' input specifies the model used for generating the text box overlays, enabling the customization and application of text to the images.
    - Comfy dtype: `GLIGEN`
    - Python dtype: `object`
- **`text`**
    - The 'text' input allows for specifying the text content to be applied across the batch of images, serving as the primary content for text overlays or modifications.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`width`**
    - This input defines the width of the text box overlay, allowing for customization of the overlay size relative to the images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The 'height' input specifies the height of the text box overlay, enabling precise control over the overlay dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`coordinates`**
    - The 'coordinates' input provides the positioning information for the text box overlays, dictating where on the images the text will be applied.
    - Comfy dtype: `STRING`
    - Python dtype: `tuple`
- **`interpolation`**
    - This input determines the interpolation method used for text box application, affecting the smoothness and blending of the text overlay on the images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The output 'conditioning' reflects the modified conditioning data after the application of text box overlays, incorporating the text modifications into the conditioning framework.
    - Python dtype: `list`
- **`image`**
    - Comfy dtype: `IMAGE`
    - The 'image' output showcases the final images with the applied text box overlays, demonstrating the visual modifications made to the batch of images.
    - Python dtype: `list`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class GLIGENTextBoxApplyBatch:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"conditioning_to": ("CONDITIONING", ),
                              "latents": ("LATENT", ),
                              "clip": ("CLIP", ),
                              "gligen_textbox_model": ("GLIGEN", ),
                              "text": ("STRING", {"multiline": True}),
                              "width": ("INT", {"default": 64, "min": 8, "max": MAX_RESOLUTION, "step": 8}),
                              "height": ("INT", {"default": 64, "min": 8, "max": MAX_RESOLUTION, "step": 8}),
                              "coordinates": ("STRING", {"multiline": True}),
                              "interpolation": (
                                [   
                                    'straight',
                                    'CubicSpline',
                                ],
                                {
                                "default": 'CubicSpline'
                                 }),
                             }}
    RETURN_TYPES = ("CONDITIONING", "IMAGE",)
    FUNCTION = "append"
    CATEGORY = "KJNodes/experimental"
    DESCRIPTION = """
Experimental, does not function yet as ComfyUI base changes are needed
"""

    def append(self, latents, conditioning_to, clip, gligen_textbox_model, text, width, height, coordinates, interpolation):

        coordinates_dict = parse_coordinates(coordinates)
        batch_size = sum(tensor.size(0) for tensor in latents.values())
        c = []
        cond, cond_pooled = clip.encode_from_tokens(clip.tokenize(text), return_pooled=True)

        # Interpolate coordinates for the entire batch
        if interpolation == 'CubicSpline':
            interpolated_coords = interpolate_coordinates_with_curves(coordinates_dict, batch_size)
        if interpolation == 'straight':
            interpolated_coords = interpolate_coordinates(coordinates_dict, batch_size)

        plot_image_tensor = plot_to_tensor(coordinates_dict, interpolated_coords, 512, 512, height)
        for t in conditioning_to:
            n = [t[0], t[1].copy()]
            
            position_params_batch = [[] for _ in range(batch_size)]  # Initialize a list of empty lists for each batch item
            
            for i in range(batch_size):
                x_position, y_position = interpolated_coords[i] 
                position_param = (cond_pooled, height // 8, width // 8, y_position // 8, x_position // 8)
                position_params_batch[i].append(position_param)  # Append position_param to the correct sublist
                print("x ",x_position, "y ", y_position)
            prev = []
            if "gligen" in n[1]:
                prev = n[1]['gligen'][2]
            else:
                prev = [[] for _ in range(batch_size)]
            # Concatenate prev and position_params_batch, ensuring both are lists of lists
            # and each sublist corresponds to a batch item
            combined_position_params = [prev_item + batch_item for prev_item, batch_item in zip(prev, position_params_batch)]
            n[1]['gligen'] = ("position", gligen_textbox_model, combined_position_params)
            c.append(n)
        
        return (c, plot_image_tensor,)

```
