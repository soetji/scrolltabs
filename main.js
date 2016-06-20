const tabs = ['aaa asset name', 'bbb asset name', 'ccc asset name', 'ddd asset name', 'eee asset name', 'fff asset name', 'ggg asset name', 'hhh asset name', 'iii asset name', 'jjj asset name', 'kkk asset name', 'lll asset name', 'mmm asset name', 'nnn asset name'];

ReactDOM.render(
    <ScrollTabs tabs={tabs} tabMinWidth={100} selectedIndex={8} />,
    document.getElementById('main')
);
