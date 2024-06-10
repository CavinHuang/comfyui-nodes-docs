# Documentation
- Class name: CR_XYList
- Category: Comfyroll/XY Grid
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_XYList 节点旨在对两个列表执行交叉连接操作，生成组合的网格。它能够向列表元素添加前缀和后缀字符串，增强了输出的灵活性。该节点还提供注释和触发机制，以指示网格生成的完成。

# Input types
## Required
- index
    - 索引参数对于确定当前组合在网格中的位置至关重要。它通过决定选择输入列表中的哪些元素进行输出，影响节点的执行。
    - Comfy dtype: INT
    - Python dtype: int
- list1
    - List1 是交叉连接操作的第一个输入列表。它在节点的功能中起着关键作用，通过为网格的水平元素的生成做出贡献。
    - Comfy dtype: STRING
    - Python dtype: str
- list2
    - List2 是交叉连接操作的第二个输入列表，对于创建网格的垂直元素至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- x_prepend
    - x_prepend 参数允许在 list1 中的每个元素前添加前缀。这可以用来自定义输出格式或为元素添加上下文。
    - Comfy dtype: STRING
    - Python dtype: str
- x_append
    - x_append 参数用于在 list1 中的每个元素后追加后缀，提供对输出元素的进一步自定义。
    - Comfy dtype: STRING
    - Python dtype: str
- x_annotation_prepend
    - x_annotation_prepend 参数用于在生成注释时为 list1 中的每个元素添加注释前缀。它增强了注释的描述性。
    - Comfy dtype: STRING
    - Python dtype: str
- y_prepend
    - y_prepend 参数允许在 list2 中的每个元素前添加前缀，允许自定义垂直元素的输出。
    - Comfy dtype: STRING
    - Python dtype: str
- y_append
    - y_append 参数用于在 list2 中的每个元素后追加后缀，提供对垂直元素最终格式的额外控制。
    - Comfy dtype: STRING
    - Python dtype: str
- y_annotation_prepend
    - y_annotation_prepend 参数允许在生成注释时为 list2 中的每个元素添加注释前缀，增强了注释的信息量。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- X
    - X 输出代表当前索引下 list1 的水平组合元素。它是网格行的关键组成部分。
    - Comfy dtype: STRING
    - Python dtype: str
- Y
    - Y 输出代表相应索引下 list2 的垂直组合元素。它是网格列的关键组成部分。
    - Comfy dtype: STRING
    - Python dtype: str
- x_annotation
    - x_annotation 输出在网格生成完成时提供 list1 元素的注释版本，增强了结果的可解释性。
    - Comfy dtype: STRING
    - Python dtype: str
- y_annotation
    - y_annotation 输出在网格生成完成时提供 list2 元素的注释版本，为结果的解释增添了上下文。
    - Comfy dtype: STRING
    - Python dtype: str
- trigger
    - trigger 输出指示网格生成何时完成，标志着交叉连接过程的结束。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- show_help
    - show_help 输出提供了一个 URL 链接到文档，以获得关于使用该节点的进一步帮助和指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_XYList:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'index': ('INT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'list1': ('STRING', {'multiline': True, 'default': 'x'}), 'x_prepend': ('STRING', {'multiline': False, 'default': ''}), 'x_append': ('STRING', {'multiline': False, 'default': ''}), 'x_annotation_prepend': ('STRING', {'multiline': False, 'default': ''}), 'list2': ('STRING', {'multiline': True, 'default': 'y'}), 'y_prepend': ('STRING', {'multiline': False, 'default': ''}), 'y_append': ('STRING', {'multiline': False, 'default': ''}), 'y_annotation_prepend': ('STRING', {'multiline': False, 'default': ''})}}
    RETURN_TYPES = ('STRING', 'STRING', 'STRING', 'STRING', 'BOOLEAN', 'STRING')
    RETURN_NAMES = ('X', 'Y', 'x_annotation', 'y_annotation', 'trigger', 'show_help')
    FUNCTION = 'cross_join'
    CATEGORY = icons.get('Comfyroll/XY Grid')

    def cross_join(self, list1, list2, x_prepend, x_append, x_annotation_prepend, y_prepend, y_append, y_annotation_prepend, index):
        index -= 1
        trigger = False
        listx = re.split(',(?=(?:[^"]*"[^"]*")*[^"]*$)', list1)
        listy = re.split(',(?=(?:[^"]*"[^"]*")*[^"]*$)', list2)
        listx = [item.strip() for item in listx]
        listy = [item.strip() for item in listy]
        lenx = len(listx)
        leny = len(listy)
        grid_size = lenx * leny
        x = index % lenx
        y = int(index / lenx)
        x_out = x_prepend + listx[x] + x_append
        y_out = y_prepend + listy[y] + y_append
        x_ann_out = ''
        y_ann_out = ''
        if index + 1 == grid_size:
            x_ann_out = [x_annotation_prepend + item + ';' for item in listx]
            y_ann_out = [y_annotation_prepend + item + ';' for item in listy]
            x_ann_out = ''.join([str(item) for item in x_ann_out])
            y_ann_out = ''.join([str(item) for item in y_ann_out])
            trigger = True
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/XY-Grid-Nodes#cr-xy-list'
        return (x_out, y_out, x_ann_out, y_ann_out, trigger, show_help)
```