---
tags:
- Mask
- MaskGeneration
---

# CreateFluidMask
## Documentation
- Class name: `CreateFluidMask`
- Category: `KJNodes/masking/generate`
- Output node: `False`

The CreateFluidMask node is designed to generate dynamic fluid-based masks for images, utilizing parameters such as inflow characteristics and dimensions to simulate fluid motion and interactions. This process is aimed at creating visually complex and varied masks that can be applied to images for artistic or processing purposes.
## Input types
### Required
- **`invert`**
    - Determines whether the fluid mask should be inverted, affecting the visual representation of the mask in relation to the fluid's motion.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`frames`**
    - Specifies the number of frames to simulate, dictating the duration of the fluid's motion and the complexity of the resulting mask.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`width`**
    - Sets the width of the mask, defining the horizontal dimension of the fluid simulation space.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Sets the height of the mask, defining the vertical dimension of the fluid simulation space.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`inflow_count`**
    - Determines the number of inflow points in the fluid simulation, influencing the number of sources from which fluid enters the space.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`inflow_velocity`**
    - Controls the velocity of the inflow, affecting the speed at which fluid enters the simulation space.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`inflow_radius`**
    - Specifies the radius of the inflow points, impacting the size of the area through which fluid is introduced.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`inflow_padding`**
    - Sets the padding around inflow points, ensuring there is a defined space between the fluid's entry points and the simulation boundaries.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`inflow_duration`**
    - Defines the duration for which each inflow point remains active, influencing the overall flow and distribution of fluid within the simulation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The generated image mask that visually represents the fluid simulation.
    - Python dtype: `numpy.ndarray`
- **`mask`**
    - Comfy dtype: `MASK`
    - A binary mask that delineates the areas affected by the fluid simulation, useful for image processing applications.
    - Python dtype: `numpy.ndarray`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CreateFluidMask:
    
    RETURN_TYPES = ("IMAGE", "MASK")
    FUNCTION = "createfluidmask"
    CATEGORY = "KJNodes/masking/generate"

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                 "invert": ("BOOLEAN", {"default": False}),
                 "frames": ("INT", {"default": 0,"min": 0, "max": 255, "step": 1}),
                 "width": ("INT", {"default": 256,"min": 16, "max": 4096, "step": 1}),
                 "height": ("INT", {"default": 256,"min": 16, "max": 4096, "step": 1}),
                 "inflow_count": ("INT", {"default": 3,"min": 0, "max": 255, "step": 1}),
                 "inflow_velocity": ("INT", {"default": 1,"min": 0, "max": 255, "step": 1}),
                 "inflow_radius": ("INT", {"default": 8,"min": 0, "max": 255, "step": 1}),
                 "inflow_padding": ("INT", {"default": 50,"min": 0, "max": 255, "step": 1}),
                 "inflow_duration": ("INT", {"default": 60,"min": 0, "max": 255, "step": 1}),
        },
    } 
    #using code from https://github.com/GregTJ/stable-fluids
    def createfluidmask(self, frames, width, height, invert, inflow_count, inflow_velocity, inflow_radius, inflow_padding, inflow_duration):
        from ..utility.fluid import Fluid
        from scipy.spatial import erf
        out = []
        masks = []
        RESOLUTION = width, height
        DURATION = frames

        INFLOW_PADDING = inflow_padding
        INFLOW_DURATION = inflow_duration
        INFLOW_RADIUS = inflow_radius
        INFLOW_VELOCITY = inflow_velocity
        INFLOW_COUNT = inflow_count

        print('Generating fluid solver, this may take some time.')
        fluid = Fluid(RESOLUTION, 'dye')

        center = np.floor_divide(RESOLUTION, 2)
        r = np.min(center) - INFLOW_PADDING

        points = np.linspace(-np.pi, np.pi, INFLOW_COUNT, endpoint=False)
        points = tuple(np.array((np.cos(p), np.sin(p))) for p in points)
        normals = tuple(-p for p in points)
        points = tuple(r * p + center for p in points)

        inflow_velocity = np.zeros_like(fluid.velocity)
        inflow_dye = np.zeros(fluid.shape)
        for p, n in zip(points, normals):
            mask = np.linalg.norm(fluid.indices - p[:, None, None], axis=0) <= INFLOW_RADIUS
            inflow_velocity[:, mask] += n[:, None] * INFLOW_VELOCITY
            inflow_dye[mask] = 1

        
        for f in range(DURATION):
            print(f'Computing frame {f + 1} of {DURATION}.')
            if f <= INFLOW_DURATION:
                fluid.velocity += inflow_velocity
                fluid.dye += inflow_dye

            curl = fluid.step()[1]
            # Using the error function to make the contrast a bit higher. 
            # Any other sigmoid function e.g. smoothstep would work.
            curl = (erf(curl * 2) + 1) / 4

            color = np.dstack((curl, np.ones(fluid.shape), fluid.dye))
            color = (np.clip(color, 0, 1) * 255).astype('uint8')
            image = np.array(color).astype(np.float32) / 255.0
            image = torch.from_numpy(image)[None,]
            mask = image[:, :, :, 0] 
            masks.append(mask)
            out.append(image)
        
        if invert:
            return (1.0 - torch.cat(out, dim=0),1.0 - torch.cat(masks, dim=0),)
        return (torch.cat(out, dim=0),torch.cat(masks, dim=0),)

```
