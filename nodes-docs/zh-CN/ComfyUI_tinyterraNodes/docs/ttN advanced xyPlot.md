
# Documentation
- Class name: ttN advanced xyPlot
- Category: ttN/pipe
- Output node: False

ttN advanced xyPlot节点旨在提供高级绘图功能，能够生成和操作具有增强特性的XY图，如网格间距、潜在索引考虑和单独输出控制。它为可视化复杂数据关系和模式提供了一个可定制的框架。

# Input types
## Required
- grid_spacing
    - 指定网格上点之间的间距，影响绘制点的密度和分离程度，从而影响图表的粒度和整体外观。
    - Comfy dtype: INT
    - Python dtype: int
- latent_index
    - 标识要可视化的特定潜在维度或索引，允许对高维数据空间进行有针对性的探索和分析。
    - Comfy dtype: INT
    - Python dtype: int
- output_individuals
    - 控制是否单独输出各个数据点，使得能够对图表中的每个点进行详细检查和分析。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- flip_xy
    - 决定是否交换x和y轴，允许对绘制数据进行替代视角和方向的展示。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- x_plot
    - 提供x轴的数据点，构成图表数据表示的一个维度。
    - Comfy dtype: STRING
    - Python dtype: str
- y_plot
    - 提供y轴的数据点，构成图表数据表示的另一个维度。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- adv_xyPlot
    - 输出一个包含图表数据的字典，包括x和y坐标、网格间距、潜在索引和输出控制信息，封装了图表的全面配置。
    - Comfy dtype: ADV_XYPLOT
    - Python dtype: dict


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ttN_advanced_XYPlot:
    version = '1.0.0'
    plotPlaceholder = "_PLOT\nExample:\n\n<axis number:label1>\n[node_ID:widget_Name='value']\n\n<axis number2:label2>\n[node_ID:widget_Name='value2']\n[node_ID:widget2_Name='value']\n[node_ID2:widget_Name='value']\n\netc..."

    def get_plot_points(plot_data, unique_id):
        if plot_data is None or plot_data.strip() == '':
            return None
        else:
            try:
                axis_dict = {}
                lines = plot_data.split('<')
                new_lines = []
                temp_line = ''

                for line in lines:
                    if line.startswith('lora'):
                        temp_line += '<' + line
                        new_lines[-1] = temp_line
                    else:
                        new_lines.append(line)
                        temp_line = line
                        
                for line in new_lines:
                    if line:
                        values_label = []
                        line = line.split('>', 1)
                        num, label = line[0].split(':', 1)
                        axis_dict[num] = {"label": label}
                        for point in line[1].split('['):
                            if point.strip() != '':
                                node_id = point.split(':', 1)[0]
                                axis_dict[num][node_id] = {}
                                input_name = point.split(':', 1)[1].split('=')[0]
                                value = point.split("'")[1].split("'")[0]
                                values_label.append((value, input_name, node_id))
                                
                                axis_dict[num][node_id][input_name] = value
                                
                        if label in ['v_label', 'tv_label', 'idtv_label']:
                            new_label = []
                            for value, input_name, node_id in values_label:
                                if label == 'v_label':
                                    new_label.append(value)
                                elif label == 'tv_label':
                                    new_label.append(f'{input_name}: {value}')
                                elif label == 'idtv_label':
                                    new_label.append(f'[{node_id}] {input_name}: {value}')
                            axis_dict[num]['label'] = ', '.join(new_label)
                        
            except ValueError:
                ttNl('Invalid Plot - defaulting to None...').t(f'advanced_XYPlot[{unique_id}]').warn().p()
                return None
            return axis_dict

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "grid_spacing": ("INT",{"min": 0, "max": 500, "step": 5, "default": 0,}),
                "latent_index": ("INT",{"min": 0, "max": 100, "step": 1, "default": 0, }),
                "output_individuals": (["False", "True"],{"default": "False"}),
                "flip_xy": (["False", "True"],{"default": "False"}),
                "x_plot": ("STRING",{"default": '', "multiline": True, "placeholder": 'X' + ttN_advanced_XYPlot.plotPlaceholder, "pysssss.autocomplete": False}),
                "y_plot": ("STRING",{"default": '', "multiline": True, "placeholder": 'Y' + ttN_advanced_XYPlot.plotPlaceholder, "pysssss.autocomplete": False}),
            },
            "hidden": {
                "prompt": ("PROMPT",),
                "extra_pnginfo": ("EXTRA_PNGINFO",),
                "my_unique_id": ("MY_UNIQUE_ID",),
                "ttNnodeVersion": ttN_XYPlot.version,
            },
        }

    RETURN_TYPES = ("ADV_XYPLOT", )
    RETURN_NAMES = ("adv_xyPlot", )
    FUNCTION = "plot"

    CATEGORY = "ttN/pipe"
    
    def plot(self, grid_spacing, latent_index, output_individuals, flip_xy, x_plot, y_plot, prompt=None, extra_pnginfo=None, my_unique_id=None):
        x_plot = ttN_advanced_XYPlot.get_plot_points(x_plot, my_unique_id)
        y_plot = ttN_advanced_XYPlot.get_plot_points(y_plot, my_unique_id)

        if x_plot == {}:
            x_plot = None
        if y_plot == {}:
            y_plot = None

        if flip_xy == "True":
            x_plot, y_plot = y_plot, x_plot

        xy_plot = {"x_plot": x_plot,
                   "y_plot": y_plot,
                   "grid_spacing": grid_spacing,
                   "latent_index": latent_index,
                   "output_individuals": output_individuals,}
        
        return (xy_plot, )

```
