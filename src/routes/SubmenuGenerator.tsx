// @ts-nocheck
const marki = {
  Davines: [
    'Essential Haircare',
    'Heart of glass',
    'Liquid spell',
    'More Inside',
    'OI',
    'Pasta&Love',
  ],
  Grazette: ['Crush', 'Neccin'],
  Moroccanoil: [
    'Blonde Perfecting',
    'Hydration',
    'Repair',
    'Smooth',
    'Treatment',
    'Volume',
  ],
  K18: [],
  Kemon: ['Actyva', 'Hair manya', 'Yo cond', 'Liding'],
  Rica: [],
  Shangpree: [],
  Yonelle: [
    'Body Feeling',
    'Fortefusion',
    'Infusion',
    'Medesthetic',
    'Medifusion',
    'Metamorphosis',
    'Yoshino',
    'Trifusion',
  ],
};
const SubmenuGenerator = () => {
  return (
    <li class="parent">
      <h3>
        <a href="/marki" title="Marki" class="spanhover mainlevel">
          <span>Marki</span>
          <img src="/producer-davines.png" alt="" class="px1" />
        </a>
      </h3>
      <div class="submenu level1 brand_menu_wrapper">
        <ul class="level1">
          {Object.entries(marki).map((el) => (
            <li class="parent">
              <h3>
                <a
                  href={`/${el[0].replace(' ', '-').toLocaleLowerCase()}`}
                  title={`/${el[0]}`}
                  class="spanhover"
                >
                  <span>{`${el[0]}`}</span>
                  <img src="/producer-davines.png" alt="" class="px1" />
                </a>
              </h3>
              <div class="submenu level2">
                {el[1].length ? (
                  <ul class="level2">
                    {el[1]
                      .sort((a, b) => a - b)
                      .map((kolekcja) => (
                        <li>
                          <h3>
                            <a
                              href={`${el[0].replace(' ', '-').toLocaleLowerCase()}/${kolekcja.replace(' ', '-').toLocaleLowerCase()}`}
                              title={`${el[0]}/${kolekcja}`}
                              class="spanhover"
                            >
                              <span>{`${kolekcja}`}</span>
                              <img
                                src="/producer-davines.png"
                                alt=""
                                class="px1"
                              />
                            </a>
                          </h3>
                        </li>
                      ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default SubmenuGenerator;
