---
tags:
- CLIP
- Conditioning
---

# GLIGENTextBoxApplyBatchCoords
## Documentation
- Class name: `GLIGENTextBoxApplyBatchCoords`
- Category: `KJNodes/experimental`
- Output node: `False`

This node is designed to apply text box transformations to a batch of coordinates, integrating text-based conditioning and geometric transformations. It leverages CLIP models for text encoding and supports different interpolation methods for coordinate transformation, aiming to enhance image generation processes with text-driven spatial adjustments.
## Input types
### Required
- **`conditioning_to`**
    - Indicates the target condition or context for the text encoding, guiding the transformation process in alignment with textual descriptions.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`latents`**
    - Represents the latent space vectors to which the transformations are applied, serving as the foundation for the subsequent image generation process.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`clip`**
    - The CLIP model used for encoding text, facilitating the integration of text-based conditioning into the transformation process.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`gligen_textbox_model`**
    - The specific model responsible for applying the text box transformations, central to executing the spatial adjustments.
    - Comfy dtype: `GLIGEN`
    - Python dtype: `torch.nn.Module`
- **`coordinates`**
    - Specifies the target coordinates for transformation, dictating the spatial adjustments to be applied across the batch.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text`**
    - The text input used for conditioning, driving the spatial transformations in accordance with textual descriptions.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`width`**
    - The width parameter for the output image, influencing the scale of applied transformations.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The height parameter for the output image, determining the vertical scale of the transformations.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The modified conditioning data, enriched with text-driven spatial adjustments.
    - Python dtype: `List[Tuple[Any, Dict[str, Any]]]`
- **`image`**
    - Comfy dtype: `IMAGE`
    - The generated image after applying the text box transformations and conditioning, showcasing the spatial adjustments.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class GLIGENTextBoxApplyBatchCoords:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"conditioning_to": ("CONDITIONING", ),
                              "latents": ("LATENT", ),
                              "clip": ("CLIP", ),
                              "gligen_textbox_model": ("GLIGEN", ),
                              "coordinates": ("STRING", {"forceInput": True}),
                              "text": ("STRING", {"multiline": True}),
                              "width": ("INT", {"default": 64, "min": 8, "max": 4096, "step": 8}),
                              "height": ("INT", {"default": 64, "min": 8, "max": 4096, "step": 8}),
                            },
                }
    RETURN_TYPES = ("CONDITIONING", "IMAGE", )
    FUNCTION = "append"
    CATEGORY = "KJNodes/experimental"
    DESCRIPTION = """
Experimental, does not function yet as ComfyUI base changes are needed
"""

    def append(self, latents, coordinates, conditioning_to, clip, gligen_textbox_model, text, width, height):
        coordinates = json.loads(coordinates.replace("'", '"'))
        coordinates = [(coord['x'], coord['y']) for coord in coordinates]

        batch_size = sum(tensor.size(0) for tensor in latents.values())
        assert len(coordinates) == batch_size, "The number of coordinates does not match the number of latents"
        c = []
        cond, cond_pooled = clip.encode_from_tokens(clip.tokenize(text), return_pooled=True)

        image_height = latents['samples'].shape[-2] * 8
        image_width = latents['samples'].shape[-1] * 8
        plot_image_tensor = self.plot_coordinates_to_tensor(coordinates, image_height, image_width, height, text)

        for t in conditioning_to:
            n = [t[0], t[1].copy()]
            
            position_params_batch = [[] for _ in range(batch_size)]  # Initialize a list of empty lists for each batch item
            
            for i in range(batch_size):
                x_position, y_position = coordinates[i] 
                position_param = (cond_pooled, height // 8, width // 8, y_position // 8, x_position // 8)
                position_params_batch[i].append(position_param)  # Append position_param to the correct sublist

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
    
    def plot_coordinates_to_tensor(self, coordinates, height, width, box_size, prompt):
        import matplotlib
        matplotlib.use('Agg')
        from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas

        # Convert coordinates to separate x and y lists
        #x_coords, y_coords = zip(*coordinates)

        fig, ax = matplotlib.pyplot.subplots(figsize=(width/100, height/100), dpi=100)
        #ax.scatter(x_coords, y_coords, color='yellow', label='_nolegend_')

        # Draw a box at each coordinate
        for x, y in coordinates:
            rect = matplotlib.patches.Rectangle((x - box_size/2, y - box_size/2), box_size, box_size,
                                    linewidth=1, edgecolor='green', facecolor='none', alpha=0.5)
            ax.add_patch(rect)

         # Draw arrows from one point to another to indicate direction
        for i in range(len(coordinates) - 1):
            x1, y1 = coordinates[i]
            x2, y2 = coordinates[i + 1]
            ax.annotate("", xy=(x2, y2), xytext=(x1, y1),
                        arrowprops=dict(arrowstyle="->",
                                        linestyle="-",
                                        lw=1,
                                        color='orange',
                                        mutation_scale=10))
        matplotlib.pyplot.rcParams['text.color'] = '#999999'
        fig.patch.set_facecolor('#353535')
        ax.set_facecolor('#353535')
        ax.grid(color='#999999', linestyle='-', linewidth=0.5)
        ax.set_xlabel('x', color='#999999')
        ax.set_ylabel('y', color='#999999')
        for text in ax.get_xticklabels() + ax.get_yticklabels():
            text.set_color('#999999')
        ax.set_title('Gligen pos for: ' + prompt)
        ax.set_xlabel('X Coordinate')
        ax.set_ylabel('Y Coordinate')
        ax.legend().remove()
        ax.set_xlim(0, width) # Set the x-axis to match the input latent width
        ax.set_ylim(height, 0) # Set the y-axis to match the input latent height, with (0,0) at top-left
        # Adjust the margins of the subplot
        matplotlib.pyplot.subplots_adjust(left=0.08, right=0.95, bottom=0.05, top=0.95, wspace=0.2, hspace=0.2)
        canvas = FigureCanvas(fig)
        canvas.draw()
        matplotlib.pyplot.close(fig)

        width, height = fig.get_size_inches() * fig.get_dpi()        

        image_np = np.frombuffer(canvas.tostring_rgb(), dtype='uint8').reshape(int(height), int(width), 3)
        image_tensor = torch.from_numpy(image_np).float() / 255.0
        image_tensor = image_tensor.unsqueeze(0)

        return image_tensor

```
