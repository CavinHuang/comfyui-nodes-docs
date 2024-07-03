
# Documentation
- Class name: GLIGENTextBoxApplyBatchCoords
- Category: KJNodes/experimental
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

GLIGENTextBoxApplyBatchCoords 节点专门用于将文本框变换应用于一批坐标，集成了基于文本的条件控制和几何变换。它利用 CLIP 模型进行文本编码，并支持不同的插值方法进行坐标变换，旨在通过文本驱动的空间调整来增强图像生成过程。

# Input types
## Required
- conditioning_to
    - 指示文本编码的目标条件或上下文，引导变换过程与文本描述保持一致。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- latents
    - 表示应用变换的潜在空间向量，作为后续图像生成过程的基础。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- clip
    - 用于编码文本的 CLIP 模型，促进将基于文本的条件控制整合到变换过程中。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- gligen_textbox_model
    - 负责应用文本框变换的特定模型，是执行空间调整的核心。
    - Comfy dtype: GLIGEN
    - Python dtype: torch.nn.Module
- coordinates
    - 指定变换的目标坐标，决定了要在整个批次中应用的空间调整。
    - Comfy dtype: STRING
    - Python dtype: str
- text
    - 用于条件控制的文本输入，根据文本描述驱动空间变换。
    - Comfy dtype: STRING
    - Python dtype: str
- width
    - 输出图像的宽度参数，影响应用变换的比例。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 输出图像的高度参数，决定变换的垂直比例。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- conditioning
    - Comfy dtype: CONDITIONING
    - 经过修改的条件控制数据，富含文本驱动的空间调整。
    - Python dtype: List[Tuple[Any, Dict[str, Any]]]
- image
    - Comfy dtype: IMAGE
    - 应用文本框变换和条件控制后生成的图像，展示了空间调整的效果。
    - Python dtype: torch.Tensor


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
