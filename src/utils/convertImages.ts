export const convertImages = (htmlText: string) => {
  const regex = /<img\s[^>]*?style\s*=\s*['\"]float([^'\"]*?)['\"][^>]*?>/g;
  let m;
  while ((m = regex.exec(htmlText)) !== null)
  {
    if (m.index === regex.lastIndex) regex.lastIndex++;
    let repl: null | string = null, type: null | string = null;
    m.forEach((match, groupIndex) => {
      if (groupIndex == 0) repl = match;
      if (groupIndex == 1) type = match;
      if (repl && type)
      {
        if (type.includes('none')) htmlText = htmlText.replace(repl, `<div style="text-align: center;width: 100%;">` + repl + '</div>');
        else htmlText = htmlText.replace(repl, `<div style="text-align ${ type }; width: 100%;">` + repl + '</div>');
        repl = null;
        type = null;
      }
    });
  }
  return htmlText;
};
