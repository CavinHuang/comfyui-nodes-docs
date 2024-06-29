# Documentation
- Class name: CR_XYInterpolate
- Category: Comfyroll/XY Grid
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_XYInterpolate节点旨在XY网格上生成梯度。它沿X轴和Y轴计算插值，提供在指定的起点和终点之间的平滑过渡。此节点特别适用于创建复杂的渐变图案，并且能够使用自定义标签注释网格点。

# Input types
## Required
- x_columns
    - x_columns参数定义了网格中的列数。它对于确定网格布局的水平间距和整体结构至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- x_start_value
    - x_start_value设置X轴插值的初始值。它很重要，因为它为网格列上的梯度计算建立了起始点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- x_step
    - x_step参数指定网格中连续X值之间的增量。它对于控制沿水平轴的变化速率至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- y_rows
    - y_rows参数指定网格中的行数。它对于建立网格内的垂直结构和间距至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- y_start_value
    - y_start_value设置Y轴插值的初始值。它是一个关键参数，用于确定网格行上的梯度计算的起始点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- y_step
    - y_step参数确定网格中连续Y值之间的增量。它对于控制垂直梯度的进展很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- index
    - index参数用于引用网格内的具体位置。它决定了计算和返回哪些插值。
    - Comfy dtype: INT
    - Python dtype: int
- gradient_profile
    - gradient_profile参数选择要使用的梯度配置文件类型。它影响网格上插值的执行方式。
    - Comfy dtype: COMBO['Lerp']
    - Python dtype: str
## Optional
- x_annotation_prepend
    - x_annotation_prepend允许向每个X注释添加自定义前缀。这可以用来在注释中包含额外的上下文或信息。
    - Comfy dtype: STRING
    - Python dtype: str
- y_annotation_prepend
    - y_annotation_prepend参数允许向每个Y注释添加自定义前缀，通过额外的细节或上下文增强注释。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- X
    - X输出提供指定网格位置的插值X值。它是梯度计算过程的关键结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- Y
    - Y输出提供指定网格位置的插值Y值。它代表梯度插值的一个重要结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- x_annotation
    - x_annotation输出返回表示网格上X值注释的字符串。它用于标记网格点并提供上下文。
    - Comfy dtype: STRING
    - Python dtype: str
- y_annotation
    - y_annotation输出为网格中Y值的注释生成一个字符串。它有助于识别和情境化网格的垂直点。
    - Comfy dtype: STRING
    - Python dtype: str
- trigger
    - trigger输出指示何时满足特定条件，例如到达最后一个网格点。它可以用来启动进一步的动作或流程。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- show_help
    - show_help输出提供指向节点文档页面的URL链接。它为用户提供了直接访问更详细信息和使用节点的指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_XYInterpolate:

    @classmethod
    def INPUT_TYPES(s):
        gradient_profiles = ['Lerp']
        return {'required': {'x_columns': ('INT', {'default': 5.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'x_start_value': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 0.01}), 'x_step': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 9999.0, 'step': 0.01}), 'x_annotation_prepend': ('STRING', {'multiline': False, 'default': ''}), 'y_rows': ('INT', {'default': 5.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'y_start_value': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 0.01}), 'y_step': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 9999.0, 'step': 0.01}), 'y_annotation_prepend': ('STRING', {'multiline': False, 'default': ''}), 'index': ('INT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'gradient_profile': (gradient_profiles,)}}
    RETURN_TYPES = ('FLOAT', 'FLOAT', 'STRING', 'STRING', 'BOOLEAN', 'STRING')
    RETURN_NAMES = ('X', 'Y', 'x_annotation', 'y_annotation', 'trigger', 'show_help')
    FUNCTION = 'gradient'
    CATEGORY = icons.get('Comfyroll/XY Grid')

    def gradient(self, x_columns, x_start_value, x_step, x_annotation_prepend, y_rows, y_start_value, y_step, y_annotation_prepend, index, gradient_profile):
        index -= 1
        trigger = False
        grid_size = x_columns * y_rows
        x = index % x_columns
        y = int(index / x_columns)
        x_float_out = round(x_start_value + x * x_step, 3)
        y_float_out = round(y_start_value + y * y_step, 3)
        x_ann_out = ''
        y_ann_out = ''
        if index + 1 == grid_size:
            for i in range(0, x_columns):
                x = index % x_columns
                x_float_out = x_start_value + i * x_step
                x_float_out = round(x_float_out, 3)
                x_ann_out = x_ann_out + x_annotation_prepend + str(x_float_out) + '; '
            for j in range(0, y_rows):
                y = int(index / x_columns)
                y_float_out = y_start_value + j * y_step
                y_float_out = round(y_float_out, 3)
                y_ann_out = y_ann_out + y_annotation_prepend + str(y_float_out) + '; '
            x_ann_out = x_ann_out[:-1]
            y_ann_out = y_ann_out[:-1]
            print(x_ann_out, y_ann_out)
            trigger = True
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/XY-Grid-Nodes#cr-xy-interpolate'
        return (x_float_out, y_float_out, x_ann_out, y_ann_out, trigger, show_help)
```