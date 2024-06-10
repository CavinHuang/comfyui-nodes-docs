---
tags:
- DepthMap
- DepthMapEstimation
- Image
---

# ColorizeDepthmap
## Documentation
- Class name: `ColorizeDepthmap`
- Category: `Marigold`
- Output node: `False`

The ColorizeDepthmap node is designed to transform depth maps into colorized images. It leverages color mapping techniques to visually represent the depth information contained within a depth map, enhancing interpretability and visual appeal. This process involves adjusting the color intensity based on the depth values, providing a more intuitive understanding of depth variations in the visualized data.
## Input types
### Required
- **`image`**
    - The depth map to be colorized. It is the primary input that contains depth information which will be visually enhanced through colorization.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor or numpy.ndarray`
- **`colorize_method`**
    - The colormap name to use for colorizing the depth map. It specifies the color scheme applied to represent different depth values.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The colorized depth map, where depth information is represented through color variations. This output provides a visually enhanced version of the original depth data, making it easier to interpret.
    - Python dtype: `torch.Tensor or numpy.ndarray`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ColorizeDepthmap:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {  
            "image": ("IMAGE", ),
            "colorize_method": (
            [   
                'Spectral',
                'terrain', 
                'viridis',
                'plasma',
                'inferno',
                'magma',
                'cividis',
                'twilight',
                'rainbow',
                'gist_rainbow',
                'gist_ncar',
                'gist_earth',
                'turbo',
                'jet',
                'afmhot',
                'copper',
                'seismic',
                'hsv',
                'brg',

            ], {
               "default": 'Spectral'
            }),
            },
            
            }
    
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES =("image",)
    FUNCTION = "color"

    CATEGORY = "Marigold"

    def color(self, image, colorize_method):
        colored_images = []
        for i in range(image.shape[0]):  # Iterate over the batch dimension
            depth_map = image[i].squeeze().permute(2, 0, 1)
            depth_map = depth_map[0]
            depth_map = colorizedepth(depth_map, colorize_method)
            depth_map = torch.from_numpy(depth_map) / 255
            depth_map = depth_map.unsqueeze(0)
            colored_images.append(depth_map)
        
        # Stack the list of tensors along a new dimension
        colored_images = torch.cat(colored_images, dim=0)
        return (colored_images,)

```
