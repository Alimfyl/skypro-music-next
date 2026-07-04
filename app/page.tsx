import './page.css';
import { Nav } from '@/components/Nav/Nav';
import { Search } from '@/components/Search/Search';
import { Filter } from '@/components/Filter/Filter';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { PlayerBar } from '@/components/PlayerBar/PlayerBar';
import { Playlist } from '@/components/Playlist/Playlist';

export default function Home() {
  return (
    <div className={'wrapper'}>
      <div className={'container'}>
        <main className={'main'}>
          <Nav />
          <div className={'centerblock'}>
            <Search />
            <h2 className={'centerblock__h2'}>Треки</h2>
            <Filter />
            <Playlist />
          </div>
          <Sidebar />
        </main>
        <PlayerBar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
