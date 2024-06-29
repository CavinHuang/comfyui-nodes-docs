---
tags:
- Mask
- MaskGeneration
---

# CreateMagicMask
## Documentation
- Class name: `CreateMagicMask`
- Category: `KJNodes/masking/generate`
- Output node: `False`

The CreateMagicMask node is designed to generate dynamic masks based on a set of parameters including frames, transitions, depth, distortion, seed, frame width, and frame height. These masks can be used to apply various visual effects to images or video frames, enabling creative and complex image processing tasks.
## Input types
### Required
- **`frames`**
    - Specifies the number of frames for which the mask will be generated, affecting the temporal length of the resulting mask sequence.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`depth`**
    - Determines the depth of the mask effect, impacting the perceived three-dimensionality or layering within the mask.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`distortion`**
    - Controls the level of distortion applied to the mask, allowing for varied degrees of visual warping and alteration.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`seed`**
    - Sets the random seed for mask generation, ensuring reproducibility of the mask patterns.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`transitions`**
    - Defines the types or patterns of transitions between masks, influencing the visual flow and changes across the generated frames.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`frame_width`**
    - Specifies the width of the frames, defining the horizontal dimension of the generated masks.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`frame_height`**
    - Specifies the height of the frames, defining the vertical dimension of the generated masks.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - Generates a dynamic mask based on the specified input parameters.
    - Python dtype: `torch.Tensor`
- **`mask_inverted`**
    - Comfy dtype: `MASK`
    - Generates an inverted version of the dynamic mask, where the mask values are reversed.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CreateMagicMask:
    
    RETURN_TYPES = ("MASK", "MASK",)
    RETURN_NAMES = ("mask", "mask_inverted",)
    FUNCTION = "createmagicmask"
    CATEGORY = "KJNodes/masking/generate"

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                 "frames": ("INT", {"default": 16,"min": 2, "max": 4096, "step": 1}),
                 "depth": ("INT", {"default": 12,"min": 1, "max": 500, "step": 1}),
                 "distortion": ("FLOAT", {"default": 1.5,"min": 0.0, "max": 100.0, "step": 0.01}),
                 "seed": ("INT", {"default": 123,"min": 0, "max": 99999999, "step": 1}),
                 "transitions": ("INT", {"default": 1,"min": 1, "max": 20, "step": 1}),
                 "frame_width": ("INT", {"default": 512,"min": 16, "max": 4096, "step": 1}),
                 "frame_height": ("INT", {"default": 512,"min": 16, "max": 4096, "step": 1}),
        },
    } 

    def createmagicmask(self, frames, transitions, depth, distortion, seed, frame_width, frame_height):
        from ..utility.magictex import coordinate_grid, random_transform, magic
        rng = np.random.default_rng(seed)
        out = []
        coords = coordinate_grid((frame_width, frame_height))

        # Calculate the number of frames for each transition
        frames_per_transition = frames // transitions

        # Generate a base set of parameters
        base_params = {
            "coords": random_transform(coords, rng),
            "depth": depth,
            "distortion": distortion,
        }
        for t in range(transitions):
        # Generate a second set of parameters that is at most max_diff away from the base parameters
            params1 = base_params.copy()
            params2 = base_params.copy()

            params1['coords'] = random_transform(coords, rng)
            params2['coords'] = random_transform(coords, rng)

            for i in range(frames_per_transition):
                # Compute the interpolation factor
                alpha = i / frames_per_transition

                # Interpolate between the two sets of parameters
                params = params1.copy()
                params['coords'] = (1 - alpha) * params1['coords'] + alpha * params2['coords']

                tex = magic(**params)

                dpi = frame_width / 10
                fig = plt.figure(figsize=(10, 10), dpi=dpi)

                ax = fig.add_subplot(111)
                plt.subplots_adjust(left=0, right=1, bottom=0, top=1)
                
                ax.get_yaxis().set_ticks([])
                ax.get_xaxis().set_ticks([])
                ax.imshow(tex, aspect='auto')
                
                fig.canvas.draw()
                img = np.array(fig.canvas.renderer._renderer)
                
                plt.close(fig)
                
                pil_img = Image.fromarray(img).convert("L")
                mask = torch.tensor(np.array(pil_img)) / 255.0
                
                out.append(mask)
        
        return (torch.stack(out, dim=0), 1.0 - torch.stack(out, dim=0),)

```
