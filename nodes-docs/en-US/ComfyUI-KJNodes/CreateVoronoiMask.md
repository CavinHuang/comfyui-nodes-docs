---
tags:
- Mask
- MaskGeneration
---

# CreateVoronoiMask
## Documentation
- Class name: `CreateVoronoiMask`
- Category: `KJNodes/masking/generate`
- Output node: `False`

The CreateVoronoiMask node is designed to generate dynamic Voronoi diagram-based masks. It utilizes parameters such as the number of points, line width, and animation speed to create visually distinct and animated masks suitable for various creative and graphical applications.
## Input types
### Required
- **`frames`**
    - Specifies the number of frames for the animated mask, allowing for the creation of dynamic, time-varying masks.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`num_points`**
    - Determines the number of points used to generate the Voronoi diagram, affecting the complexity and appearance of the resulting mask.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`line_width`**
    - Sets the width of the lines in the Voronoi diagram, influencing the visual thickness of the mask's edges.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`speed`**
    - Controls the animation speed of the mask, enabling the adjustment of how quickly the mask evolves over time.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`frame_width`**
    - Defines the width of the frame for the mask, setting the horizontal dimension of the generated mask.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`frame_height`**
    - Specifies the height of the frame for the mask, establishing the vertical dimension of the generated mask.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The generated Voronoi diagram-based mask.
    - Python dtype: `torch.Tensor`
- **`mask_inverted`**
    - Comfy dtype: `MASK`
    - The inverted version of the generated Voronoi diagram-based mask, offering an alternative visual representation.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CreateVoronoiMask:
    
    RETURN_TYPES = ("MASK", "MASK",)
    RETURN_NAMES = ("mask", "mask_inverted",)
    FUNCTION = "createvoronoi"
    CATEGORY = "KJNodes/masking/generate"

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                 "frames": ("INT", {"default": 16,"min": 2, "max": 4096, "step": 1}),
                 "num_points": ("INT", {"default": 15,"min": 1, "max": 4096, "step": 1}),
                 "line_width": ("INT", {"default": 4,"min": 1, "max": 4096, "step": 1}),
                 "speed": ("FLOAT", {"default": 0.5,"min": 0.0, "max": 1.0, "step": 0.01}),
                 "frame_width": ("INT", {"default": 512,"min": 16, "max": 4096, "step": 1}),
                 "frame_height": ("INT", {"default": 512,"min": 16, "max": 4096, "step": 1}),
        },
    } 

    def createvoronoi(self, frames, num_points, line_width, speed, frame_width, frame_height):
        from scipy.spatial import Voronoi
        # Define the number of images in the batch
        batch_size = frames
        out = []
          
        # Calculate aspect ratio
        aspect_ratio = frame_width / frame_height
        
        # Create start and end points for each point, considering the aspect ratio
        start_points = np.random.rand(num_points, 2)
        start_points[:, 0] *= aspect_ratio
        
        end_points = np.random.rand(num_points, 2)
        end_points[:, 0] *= aspect_ratio

        for i in range(batch_size):
            # Interpolate the points' positions based on the current frame
            t = (i * speed) / (batch_size - 1)  # normalize to [0, 1] over the frames
            t = np.clip(t, 0, 1)  # ensure t is in [0, 1]
            points = (1 - t) * start_points + t * end_points  # lerp

            # Adjust points for aspect ratio
            points[:, 0] *= aspect_ratio

            vor = Voronoi(points)

            # Create a blank image with a white background
            fig, ax = plt.subplots()
            plt.subplots_adjust(left=0, right=1, bottom=0, top=1)
            ax.set_xlim([0, aspect_ratio]); ax.set_ylim([0, 1])  # adjust x limits
            ax.axis('off')
            ax.margins(0, 0)
            fig.set_size_inches(aspect_ratio * frame_height/100, frame_height/100)  # adjust figure size
            ax.fill_between([0, 1], [0, 1], color='white')

            # Plot each Voronoi ridge
            for simplex in vor.ridge_vertices:
                simplex = np.asarray(simplex)
                if np.all(simplex >= 0):
                    plt.plot(vor.vertices[simplex, 0], vor.vertices[simplex, 1], 'k-', linewidth=line_width)

            fig.canvas.draw()
            img = np.array(fig.canvas.renderer._renderer)

            plt.close(fig)

            pil_img = Image.fromarray(img).convert("L")
            mask = torch.tensor(np.array(pil_img)) / 255.0

            out.append(mask)

        return (torch.stack(out, dim=0), 1.0 - torch.stack(out, dim=0),)

```
