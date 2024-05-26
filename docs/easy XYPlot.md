# Documentation
- Class name: pipeXYPlot
- Category: EasyUse/Pipe
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

pipeXYPlot节点旨在简化生成和管理XY图的过程，为用户提供一个简化的界面来可视化数据关系。它专注于提供一个用户友好的体验，使得即使没有广泛的技术知识也能创建具有各种定制选项的图表。

# Input types
## Required
- grid_spacing
    - 网格间距是一个关键参数，决定了图表的分辨率。它影响可视化的粒度，较高的值导致更粗糙的表示，而较低的值则提供更细致的细节。
    - Comfy dtype: INT
    - Python dtype: int
- output_individuals
    - 输出个体参数允许用户控制是否分别绘制每个数据点。这在处理大型数据集时，尤其能够显著影响图表的清晰度。
    - Comfy dtype: BOOL
    - Python dtype: bool
- flip_xy
    - 启用翻转XY允许用户反转图表的轴，这对于根据特定约定对齐数据或更好地视觉表示非常有用。
    - Comfy dtype: BOOL
    - Python dtype: bool
- x_axis
    - x_axis参数对于定义图表的水平轴至关重要。它决定了将用于表示x值的类别或变量，从而塑造了整个图表的结构。
    - Comfy dtype: COMBO
    - Python dtype: str
- x_values
    - x值对于图表的构建至关重要，因为它们提供了x轴的数据点。正确输入这些值确保了图表表示的准确性和相关性。
    - Comfy dtype: STRING
    - Python dtype: str
- y_axis
    - y_axis参数对于定义图表的垂直轴至关重要。它指定了将用于表示y值的类别或变量，从而影响了数据的整体解释。
    - Comfy dtype: COMBO
    - Python dtype: str
- y_values
    - y值对于绘图至关重要，因为它们代表了y轴上的数据点。准确输入这些值对于图表中数据的真实反映是必要的。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- pipe
    - 输出名为'pipe'，是一个包含整个图表配置的综合结构，包括轴、值和其他设置。它作为可视化过程的通道，确保图表根据用户的规格生成。
    - Comfy dtype: PIPE_LINE
    - Python dtype: dict

# Usage tips
- Infra type: CPU

# Source code
```
class pipeXYPlot:
    lora_list = ['None'] + folder_paths.get_filename_list('loras')
    lora_strengths = {'min': -4.0, 'max': 4.0, 'step': 0.01}
    token_normalization = ['none', 'mean', 'length', 'length+mean']
    weight_interpretation = ['comfy', 'A1111', 'compel', 'comfy++']
    loader_dict = {'ckpt_name': folder_paths.get_filename_list('checkpoints'), 'vae_name': ['Baked-VAE'] + folder_paths.get_filename_list('vae'), 'clip_skip': {'min': -24, 'max': -1, 'step': 1}, 'lora_name': lora_list, 'lora_model_strength': lora_strengths, 'lora_clip_strength': lora_strengths, 'positive': [], 'negative': []}
    sampler_dict = {'steps': {'min': 1, 'max': 100, 'step': 1}, 'cfg': {'min': 0.0, 'max': 100.0, 'step': 1.0}, 'sampler_name': comfy.samplers.KSampler.SAMPLERS, 'scheduler': comfy.samplers.KSampler.SCHEDULERS, 'denoise': {'min': 0.0, 'max': 1.0, 'step': 0.01}, 'seed': {'min': 0, 'max': MAX_SEED_NUM}}
    plot_dict = {**sampler_dict, **loader_dict}
    plot_values = ['None']
    plot_values.append('---------------------')
    for k in sampler_dict:
        plot_values.append(f'preSampling: {k}')
    plot_values.append('---------------------')
    for k in loader_dict:
        plot_values.append(f'loader: {k}')

    def __init__(self):
        pass
    rejected = ['None', '---------------------', 'Nothing']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'grid_spacing': ('INT', {'min': 0, 'max': 500, 'step': 5, 'default': 0}), 'output_individuals': (['False', 'True'], {'default': 'False'}), 'flip_xy': (['False', 'True'], {'default': 'False'}), 'x_axis': (pipeXYPlot.plot_values, {'default': 'None'}), 'x_values': ('STRING', {'default': '', 'multiline': True, 'placeholder': 'insert values seperated by "; "'}), 'y_axis': (pipeXYPlot.plot_values, {'default': 'None'}), 'y_values': ('STRING', {'default': '', 'multiline': True, 'placeholder': 'insert values seperated by "; "'})}, 'optional': {'pipe': ('PIPE_LINE',)}, 'hidden': {'plot_dict': (pipeXYPlot.plot_dict,)}}
    RETURN_TYPES = ('PIPE_LINE',)
    RETURN_NAMES = ('pipe',)
    FUNCTION = 'plot'
    CATEGORY = 'EasyUse/Pipe'

    def plot(self, grid_spacing, output_individuals, flip_xy, x_axis, x_values, y_axis, y_values, pipe=None):

        def clean_values(values):
            original_values = values.split('; ')
            cleaned_values = []
            for value in original_values:
                cleaned_value = value.strip(';').strip()
                if cleaned_value == '':
                    continue
                try:
                    cleaned_value = int(cleaned_value)
                except ValueError:
                    try:
                        cleaned_value = float(cleaned_value)
                    except ValueError:
                        pass
                cleaned_values.append(cleaned_value)
            return cleaned_values
        if x_axis in self.rejected:
            x_axis = 'None'
            x_values = []
        else:
            x_values = clean_values(x_values)
        if y_axis in self.rejected:
            y_axis = 'None'
            y_values = []
        else:
            y_values = clean_values(y_values)
        if flip_xy == 'True':
            (x_axis, y_axis) = (y_axis, x_axis)
            (x_values, y_values) = (y_values, x_values)
        xy_plot = {'x_axis': x_axis, 'x_vals': x_values, 'y_axis': y_axis, 'y_vals': y_values, 'grid_spacing': grid_spacing, 'output_individuals': output_individuals}
        if pipe is not None:
            new_pipe = pipe
            new_pipe['loader_settings'] = {**pipe['loader_settings'], 'xyplot': xy_plot}
            del pipe
        return (new_pipe, xy_plot)
```