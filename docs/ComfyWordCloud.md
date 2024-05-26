# Documentation
- Class name: ComfyWordCloud
- Category: 😺dzNodes/WordCloud
- Output node: True
- Repo Ref: https://github.com/chflame163/ComfyUI_WordCloud.git

ComfyWordCloud节点旨在通过生成词云来可视化文本数据，这是一种在主题上表示输入文本中单词出现频率的图形表示。该节点有助于识别最常见的单词及其在上下文中的重要性，提供了一个可以轻松理解和分析的视觉摘要。

# Input types
## Required
- text
    - 文本参数是节点的主要输入，包含将要处理以生成词云的文本数据。它非常重要，因为它直接影响词云中单词的内容和分布。
    - Comfy dtype: STRING
    - Python dtype: str
- width
    - 宽度参数定义了生成的词云图像的宽度，影响视觉表示的布局和缩放。它对于调整画布大小以适应期望的宽高比和显示尺寸很重要。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度数设置了词云图像的高度，与宽度参数一起决定了输出可视化的整体大小和宽高比。
    - Comfy dtype: INT
    - Python dtype: int
- scale
    - 比例参数通过按比例增加或减少单词的字体大小来调整词云的整体大小。这对于微调词云的密度和外观至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- margin
    - 边距参数指定要在词云图像边缘保留的空白空间量，这可以增强对中心内容的清晰度和关注。
    - Comfy dtype: INT
    - Python dtype: int
- font_path
    - 字体路径参数对于定义词云中使用的字体样式和特征至关重要。它影响词云内文本的视觉美感和可读性。
    - Comfy dtype: FONT_PATH
    - Python dtype: str
- min_font_size
    - 最小字体大小参数设置了词云中使用的最小字体大小，确保较少出现的单词以较小的尺寸显示，有助于整体层次结构和对更常见单词的强调。
    - Comfy dtype: INT
    - Python dtype: int
- max_font_size
    - 最大字体大小参数决定了词云中最大的字体大小，这对于突出出现频率最高的单词和确立文本的视觉显著性至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- relative_scaling
    - 相对缩放参数根据单词频率调整字体大小缩放，有助于控制词云中对更常见单词的强调程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- colormap
    - 色彩映射参数对于定义词云的颜色方案至关重要，影响视觉吸引力和通过颜色变化传达不同单词频率的能力。
    - Comfy dtype: COLOR_MAP
    - Python dtype: str
- background_color
    - 背景颜色参数设置了词云的背景颜色，对整体视觉对比度和文本的显著性起着作用。
    - Comfy dtype: STRING
    - Python dtype: str
- transparent_background
    - 透明背景参数决定了词云的背景是否透明，这对于将词云叠加在其他图像或元素上可能很重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- prefer_horizontal
    - 更优先水平参数影响词云中单词的方向，较高的值促进更水平的分布，这可能会影响整体布局和可读性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- max_words
    - 最大单词数参数限制了在词云中显示的单词数量，有助于关注最相关和最常见的术语，也会影响可视化的清晰度。
    - Comfy dtype: INT
    - Python dtype: int
- repeat
    - 重复参数控制一个单词是否可以在词云中出现多次，这可能会影响单词频率的视觉表示和词云的整体密度。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- include_numbers
    - 包含数字参数决定是否应该在词云中包含数值，这对于某些类型的文本数据分析可能很重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- random_state
    - 随机状态参数在词云中单词的定位中引入随机性，这可能导致不同的视觉结果，并增加布局的变化性。
    - Comfy dtype: INT
    - Python dtype: int
- stopwords
    - 停用词参数允许排除可能不携带重大意义的常见词，从而优化词云以强调更相关的术语。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- color_ref_image
    - 颜色参考图像参数使用参考图像来定义词云的颜色板，产生视觉上连贯且与上下文相关的表示。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- mask_image
    - 掩码图像参数提供了一个形状或模式，用于限制词云的布局，确保单词位于定义的掩码边界内。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- contour_width
    - 轮廓宽度参数调整环绕词云的轮廓的宽度，可以增强词云的定义和与背景的分离。
    - Comfy dtype: FLOAT
    - Python dtype: float
- contour_color
    - 轮廓颜色参数设置了环绕词云的轮廓的颜色，有助于整体视觉对比度和美感。
    - Comfy dtype: STRING
    - Python dtype: str
- keynote_words
    - 主题词参数允许指定在词云中应强调的单词，可能突出文本中的关键主题或话题。
    - Comfy dtype: STRING
    - Python dtype: str
- keynote_weight
    - 主题权重参数调整分配给主题词的权重，影响它们在词云中的显著性和大小。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 图像输出提供了生成的词云，作为输入文本的视觉表示，单词的大小和颜色根据它们的频率和重要性进行调整。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- mask
    - 掩码输出是一个二进制表示，勾勒出词云的形状和边界，可以用于进一步的图像处理或分析。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ComfyWordCloud:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {'required': {'text': ('STRING', {'default': '', 'multiline': True}), 'width': ('INT', {'default': 512}), 'height': ('INT', {'default': 512}), 'scale': ('FLOAT', {'default': 1, 'min': 0.1, 'max': 1000.0, 'step': 0.01}), 'margin': ('INT', {'default': 0}), 'font_path': (font_list,), 'min_font_size': ('INT', {'default': 4}), 'max_font_size': ('INT', {'default': 128}), 'relative_scaling': ('FLOAT', {'default': 0.5, 'min': 0.01, 'max': 1.0, 'step': 0.01}), 'colormap': (COLOR_MAP,), 'background_color': ('STRING', {'default': '#FFFFFF'}), 'transparent_background': ('BOOLEAN', {'default': True}), 'prefer_horizontal': ('FLOAT', {'default': 0.9, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'max_words': ('INT', {'default': 200}), 'repeat': ('BOOLEAN', {'default': False}), 'include_numbers': ('BOOLEAN', {'default': False}), 'random_state': ('INT', {'default': -1, 'min': -1, 'max': 18446744073709551615}), 'stopwords': ('STRING', {'default': ''})}, 'optional': {'color_ref_image': ('IMAGE',), 'mask_image': ('IMAGE',), 'contour_width': ('FLOAT', {'default': 0, 'min': 0, 'max': 9999, 'step': 0.1}), 'contour_color': ('STRING', {'default': '#000000'}), 'keynote_words': ('STRING', {'default': ''}), 'keynote_weight': ('INT', {'default': 60})}}
    RETURN_TYPES = ('IMAGE', 'MASK')
    RETURN_NAMES = ('image', 'mask')
    FUNCTION = 'wordcloud'
    CATEGORY = '😺dzNodes/WordCloud'
    OUTPUT_NODE = True

    def wordcloud(self, text, width, height, margin, scale, font_path, min_font_size, max_font_size, relative_scaling, colormap, background_color, transparent_background, prefer_horizontal, max_words, repeat, include_numbers, random_state, stopwords, color_ref_image=None, mask_image=None, contour_width=None, contour_color=None, keynote_words=None, keynote_weight=None):
        if text == '':
            text = default_text
            log(f'text input not found, use demo string.')
        freq_dict = WordCloud().process_text(' '.join(jieba.cut(text)))
        if not keynote_words == '':
            keynote_list = list(re.split('[，,\\s*]', keynote_words))
            keynote_list = [x for x in keynote_list if x != '']
            keynote_dict = {keynote_list[i]: keynote_weight + max(freq_dict.values()) for i in range(len(keynote_list))}
            freq_dict.update(keynote_dict)
        log(f'word frequencies dict generated, include {len(freq_dict)} words.')
        font_path = font_dict[font_path]
        if not os.path.exists(font_path):
            font_path = os.path.join(os.path.join(os.path.dirname(os.path.dirname(os.path.normpath(__file__))), 'font'), 'Alibaba-PuHuiTi-Heavy.ttf')
            log(f'font_path not found, use {font_path}')
        else:
            log(f'font_path = {font_path}')
        stopwords_set = set('')
        if not stopwords == '':
            stopwords_list = re.split('[，,\\s*]', stopwords)
            stopwords_set = set([x for x in stopwords_list if x != ''])
            for item in stopwords_set:
                if item in freq_dict.keys():
                    del freq_dict[item]
        bg_color = background_color
        mode = 'RGB'
        if transparent_background:
            bg_color = None
            mode = 'RGBA'
        if random_state == -1:
            random_state = None
        mask = None
        image_width = width
        image_height = height
        if not mask_image == None:
            p_mask = tensor2pil(mask_image)
            mask = np.array(img_whitebackground(p_mask))
            image_width = p_mask.width
            image_height = p_mask.height
        wc = WordCloud(width=width, height=height, scale=scale, margin=margin, font_path=font_path, min_font_size=min_font_size, max_font_size=max_font_size, relative_scaling=relative_scaling, colormap=colormap, mode=mode, background_color=bg_color, prefer_horizontal=prefer_horizontal, max_words=max_words, repeat=repeat, include_numbers=include_numbers, random_state=random_state, stopwords=stopwords_set, mask=mask, contour_width=contour_width, contour_color=contour_color)
        wc.generate_from_frequencies(freq_dict)
        if not color_ref_image == None:
            p_color_ref_image = tensor2pil(color_ref_image)
            p_color_ref_image = p_color_ref_image.resize((image_width, image_height))
            image_colors = ImageColorGenerator(np.array(p_color_ref_image))
            wc.recolor(color_func=image_colors)
        ret_image = wc.to_image().convert('RGBA')
        ret_mask = getRGBAmask(ret_image)
        return (pil2tensor(ret_image), ret_mask)
```