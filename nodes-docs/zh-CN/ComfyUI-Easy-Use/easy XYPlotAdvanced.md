# Documentation
- Class name: pipeXYPlotAdvanced
- Category: EasyUse/Pipe
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点提供高级XY绘图功能，专为满足管道线路的需求而设计。它与各种数据类型和设置集成，以生成可视化图表，提供对管道内数据结构和关系的洞察。节点的设计强调适应性和易用性，确保用户能够快速生成有意义的可视化图表，而无需进行广泛的配置。

# Input types
## Required
- pipe
    - ‘pipe’参数是此节点的主干，代表从中提取和可视化数据的管道线路。它对节点的运行至关重要，因为它包含了绘图所需的所有必要信息和设置。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict
- grid_spacing
    - ‘grid_spacing’参数决定了图表中网格线之间的间距，影响可视化的整体清晰度和可读性。它在以易于理解的方式呈现数据点和趋势方面发挥着重要作用。
    - Comfy dtype: INT
    - Python dtype: int
- output_individuals
    - ‘output_individuals’参数允许用户控制是否在图表中单独显示各个数据点。这对于分析特定数据点及其在数据集中的关系非常重要。
    - Comfy dtype: BOOL
    - Python dtype: bool
- flip_xy
    - ‘flip_xy’参数允许用户翻转X轴和Y轴，这在某些数据可视化场景中非常有用，尤其是当传统方向不是最佳选择时。
    - Comfy dtype: BOOL
    - Python dtype: bool
## Optional
- X
    - ‘X’参数代表X轴的配置，包括轴标签和相关值。它对于定义图表的水平维度至关重要，并且可以通过各种模型和设置进行定制。
    - Comfy dtype: X_Y
    - Python dtype: Dict
- Y
    - ‘Y’参数对应于Y轴的配置，指定轴标签和相应的值。它对于建立图表的垂直维度至关重要，并且可以通过不同的模型和设置进行调整。
    - Comfy dtype: X_Y
    - Python dtype: Dict

# Output types
- pipe
    - ‘pipe’输出是输入‘pipe’的更新版本，现在包含了生成的XY图表信息。它代表了管道的进展，将可视化结果重新整合到数据流中，以便进一步分析或处理。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict

# Usage tips
- Infra type: CPU

# Source code
```
class pipeXYPlotAdvanced:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pipe': ('PIPE_LINE',), 'grid_spacing': ('INT', {'min': 0, 'max': 500, 'step': 5, 'default': 0}), 'output_individuals': (['False', 'True'], {'default': 'False'}), 'flip_xy': (['False', 'True'], {'default': 'False'})}, 'optional': {'X': ('X_Y',), 'Y': ('X_Y',)}, 'hidden': {'my_unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('PIPE_LINE',)
    RETURN_NAMES = ('pipe',)
    FUNCTION = 'plot'
    CATEGORY = 'EasyUse/Pipe'

    def plot(self, pipe, grid_spacing, output_individuals, flip_xy, X=None, Y=None, my_unique_id=None):
        if X != None:
            x_axis = X.get('axis')
            x_values = X.get('values')
        else:
            x_axis = 'Nothing'
            x_values = ['']
        if Y != None:
            y_axis = Y.get('axis')
            y_values = Y.get('values')
        else:
            y_axis = 'Nothing'
            y_values = ['']
        if pipe is not None:
            new_pipe = pipe
            positive = pipe['loader_settings']['positive'] if 'positive' in pipe['loader_settings'] else ''
            negative = pipe['loader_settings']['negative'] if 'negative' in pipe['loader_settings'] else ''
            if x_axis == 'advanced: ModelMergeBlocks':
                models = X.get('models')
                vae_use = X.get('vae_use')
                if models is None:
                    raise Exception('models is not found')
                new_pipe['loader_settings'] = {**pipe['loader_settings'], 'models': models, 'vae_use': vae_use}
            if y_axis == 'advanced: ModelMergeBlocks':
                models = Y.get('models')
                vae_use = Y.get('vae_use')
                if models is None:
                    raise Exception('models is not found')
                new_pipe['loader_settings'] = {**pipe['loader_settings'], 'models': models, 'vae_use': vae_use}
            if x_axis in ['advanced: Lora', 'advanced: Checkpoint']:
                lora_stack = X.get('lora_stack')
                _lora_stack = []
                if lora_stack is not None:
                    for lora in lora_stack:
                        _lora_stack.append({'lora_name': lora[0], 'model': pipe['model'], 'clip': pipe['clip'], 'model_strength': lora[1], 'clip_strength': lora[2]})
                del lora_stack
                x_values = '; '.join(x_values)
                lora_stack = pipe['lora_stack'] + _lora_stack if 'lora_stack' in pipe else _lora_stack
                new_pipe['loader_settings'] = {**pipe['loader_settings'], 'lora_stack': lora_stack}
            if y_axis in ['advanced: Lora', 'advanced: Checkpoint']:
                lora_stack = Y.get('lora_stack')
                _lora_stack = []
                if lora_stack is not None:
                    for lora in lora_stack:
                        _lora_stack.append({'lora_name': lora[0], 'model': pipe['model'], 'clip': pipe['clip'], 'model_strength': lora[1], 'clip_strength': lora[2]})
                del lora_stack
                y_values = '; '.join(y_values)
                lora_stack = pipe['lora_stack'] + _lora_stack if 'lora_stack' in pipe else _lora_stack
                new_pipe['loader_settings'] = {**pipe['loader_settings'], 'lora_stack': lora_stack}
            if x_axis == 'advanced: Seeds++ Batch':
                if new_pipe['seed']:
                    value = x_values
                    x_values = []
                    for index in range(value):
                        x_values.append(str(new_pipe['seed'] + index))
                    x_values = '; '.join(x_values)
            if y_axis == 'advanced: Seeds++ Batch':
                if new_pipe['seed']:
                    value = y_values
                    y_values = []
                    for index in range(value):
                        y_values.append(str(new_pipe['seed'] + index))
                    y_values = '; '.join(y_values)
            if x_axis == 'advanced: Positive Prompt S/R':
                if positive:
                    x_value = x_values
                    x_values = []
                    for (index, value) in enumerate(x_value):
                        (search_txt, replace_txt, replace_all) = value
                        if replace_all:
                            txt = replace_txt if replace_txt is not None else positive
                            x_values.append(txt)
                        else:
                            txt = positive.replace(search_txt, replace_txt, 1) if replace_txt is not None else positive
                            x_values.append(txt)
                    x_values = '; '.join(x_values)
            if y_axis == 'advanced: Positive Prompt S/R':
                if positive:
                    y_value = y_values
                    y_values = []
                    for (index, value) in enumerate(y_value):
                        (search_txt, replace_txt, replace_all) = value
                        if replace_all:
                            txt = replace_txt if replace_txt is not None else positive
                            y_values.append(txt)
                        else:
                            txt = positive.replace(search_txt, replace_txt, 1) if replace_txt is not None else positive
                            y_values.append(txt)
                    y_values = '; '.join(y_values)
            if x_axis == 'advanced: Negative Prompt S/R':
                if negative:
                    x_value = x_values
                    x_values = []
                    for (index, value) in enumerate(x_value):
                        (search_txt, replace_txt, replace_all) = value
                        if replace_all:
                            txt = replace_txt if replace_txt is not None else negative
                            x_values.append(txt)
                        else:
                            txt = negative.replace(search_txt, replace_txt, 1) if replace_txt is not None else negative
                            x_values.append(txt)
                    x_values = '; '.join(x_values)
            if y_axis == 'advanced: Negative Prompt S/R':
                if negative:
                    y_value = y_values
                    y_values = []
                    for (index, value) in enumerate(y_value):
                        (search_txt, replace_txt, replace_all) = value
                        if replace_all:
                            txt = replace_txt if replace_txt is not None else negative
                            y_values.append(txt)
                        else:
                            txt = negative.replace(search_txt, replace_txt, 1) if replace_txt is not None else negative
                            y_values.append(txt)
                    y_values = '; '.join(y_values)
            if 'advanced: ControlNet' in x_axis:
                x_value = x_values
                x_values = []
                cnet = []
                for (index, value) in enumerate(x_value):
                    cnet.append(value)
                    x_values.append(str(index))
                x_values = '; '.join(x_values)
                new_pipe['loader_settings'] = {**pipe['loader_settings'], 'cnet_stack': cnet}
            if 'advanced: ControlNet' in y_axis:
                y_value = y_values
                y_values = []
                cnet = []
                for (index, value) in enumerate(y_value):
                    cnet.append(value)
                    y_values.append(str(index))
                y_values = '; '.join(y_values)
                new_pipe['loader_settings'] = {**pipe['loader_settings'], 'cnet_stack': cnet}
            if 'advanced: Pos Condition' in x_axis:
                x_values = '; '.join(x_values)
                cond = X.get('cond')
                new_pipe['loader_settings'] = {**pipe['loader_settings'], 'positive_cond_stack': cond}
            if 'advanced: Pos Condition' in y_axis:
                y_values = '; '.join(y_values)
                cond = Y.get('cond')
                new_pipe['loader_settings'] = {**pipe['loader_settings'], 'positive_cond_stack': cond}
            if 'advanced: Neg Condition' in x_axis:
                x_values = '; '.join(x_values)
                cond = X.get('cond')
                new_pipe['loader_settings'] = {**pipe['loader_settings'], 'negative_cond_stack': cond}
            if 'advanced: Neg Condition' in y_axis:
                y_values = '; '.join(y_values)
                cond = Y.get('cond')
                new_pipe['loader_settings'] = {**pipe['loader_settings'], 'negative_cond_stack': cond}
            del pipe
        return pipeXYPlot().plot(grid_spacing, output_individuals, flip_xy, x_axis, x_values, y_axis, y_values, new_pipe)
```